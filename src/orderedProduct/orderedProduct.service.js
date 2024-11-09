import OrderedProduct from "./orderedProduct.entity.js";
import { createShippingRequestDTO } from "../BiteShip/dto/createShipmentDTO.js";
import JenisProduct from "../jenisProducts/jenisProduct.entity.js";
import SubCategoryProduct from "../subCategoryProduct/subCategoryProduct.entity.js";
import User from "../user/user.entity.js";
import Product from "../product/product.entity.js";
import AuthPenjual from "../authPenjual/authPenjual.entity.js";
import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import KurirPenjual from "../kurirPenjual/kurirPenjual.entity.js";
import biteshipService from "../BiteShip/biteship.service.js";
import { createQRPaymentObject } from "../Xendit/dto/createQrPayment.js";
import xenditService from "../Xendit/xendit.service.js";
import sequelize from "../database/config.database.js";

class OrderedProductService {
  constructor() {
    this.orderedProductRepository = OrderedProduct;
    this.productRepository = Product;
  }

  async updateOrderStatus(orderId, newStatus) {
    try {
      const updatedOrder = await this.orderedProductRepository.update({ status: newStatus }, { where: { id_shipment: orderId } });

      if (updatedOrder[0] === 0) {
        throw new BadRequestException("Order not found or status update failed.");
      }

      return { message: "Order status updated successfully", status: newStatus };
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async create(OrderData) {
    const transaction = await sequelize.transaction(); // Begin transaction
    try {
      const { id_barang, shipping, buyerId, buyerData } = OrderData;
      const { courierId } = shipping;

      const product = await this._getProductDetails(id_barang, courierId);

      // Calculate the total product price
      let totalProductPrice = product.reduce((sum, item) => sum + item.price, 0);

      const buyerDetails = this._mapBuyerDetails(buyerData);
      const penjual = this._mapPenjualDetails(product[0]);

      const items = [];

      product.forEach((product) => {
        const item = this._createItemDetails(product);
        items.push(item);
      });

      const courierDetails = this._getCourierDetails(product[0].penjual.AuthPenjual.KurirPenjuals);

      const createShipmentData = createShippingRequestDTO(penjual, buyerDetails, courierDetails, items);
      // console.log(createShipmentData);
      const draftOrders = await biteshipService.createShipment(createShipmentData);
      const shippingFee = draftOrders.price;
      const idShipment = draftOrders.id;

      totalProductPrice += 5000
      totalProductPrice += shippingFee

      const basketData = this._createBasketData(items, shippingFee);

      // console.log(orderData);

      const metadataPayment = {
        id_shipment: idShipment,
      };

      // Create orders for each product
      const createdOrders = [];

      for (const itemProduct of product) {
        const orderData = this._createOrderData(itemProduct, buyerDetails, idShipment, buyerId,totalProductPrice);

        // Create the OrderedProduct entry for each product
        const createdOrder = await this.orderedProductRepository.create(orderData, { transaction });
        createdOrders.push(createdOrder);
      }

      const paymentData = this._createPaymentData(idShipment,totalProductPrice,basketData, metadataPayment);

      // console.log(paymentData);

      const payment = await xenditService.createQrPayment(paymentData);
      await transaction.commit(); // Commit transaction if successful

      return payment;
    } catch (error) {
      await transaction.rollback(); // Roll back transaction on error
      throw error;
    }
  }

  async _getProductDetails(id_barangArray, courierId) {
    // Ensure `id_barangArray` is treated as an array
    if (!Array.isArray(id_barangArray)) {
      throw new BadRequestException("id_barang must be an array of UUIDs.");
    }

    const products = await this.productRepository.findAll({
      attributes: ["id", "name", "price", "isAvailable", "discount", "weight", "volumePanjang", "volumeLebar", "volumeTinggi"],
      include: [
        { model: JenisProduct, attributes: ["id", "name"] },
        { model: SubCategoryProduct, attributes: ["id", "name"] },
        {
          model: User,
          as: "penjual",
          attributes: ["username", "noHandphone"],
          include: [
            {
              model: AuthPenjual,
              attributes: ["alamat", "kodePos"],
              include: [
                {
                  model: KurirPenjual,
                  attributes: ["id", "layananKurirId", "layananKurirServiceId"],
                  where: { id: courierId },
                  required: false, // Optional, based on your requirements
                },
              ],
            },
          ],
        },
      ],
      where: {
        id: id_barangArray,
        isAvailable: true,
      },
      nest: true,
    });

    if (products.length === 0) {
      throw new BadRequestException("No products found or they are not on sale.");
    }

    products.forEach((product) => {
      if (!product.penjual?.AuthPenjual) {
        throw new BadRequestException(`Shipping information is incorrect for product ID ${product.id}.`);
      }
    });

    return products;
  }

  _mapBuyerDetails(buyerData) {
    return {
      contactName: buyerData.contactName,
      contactPhone: buyerData.contactPhone,
      contactEmail: buyerData.contactEmail,
      address: buyerData.address,
      postalCode: buyerData.postalCode,
      note: buyerData.note,
    };
  }

  _mapPenjualDetails(product) {
    return {
      contactName: product.penjual.username,
      contactPhone: product.penjual.noHandphone,
      contactEmail: product.penjual.email,
      address: product.penjual.AuthPenjual.alamat,
      postalCode: product.penjual.AuthPenjual.kodePos,
      note: product.penjual.note || "",
    };
  }

  _createItemDetails(product) {
    return {
      id: product.id,
      name: product.name,
      category: product.JenisProduct.name,
      value: product.price,
      quantity: 1,
      height: product.volumeTinggi,
      length: product.volumePanjang,
      weight: product.weight,
      width: product.volumeLebar,
    };
  }

  _getCourierDetails(couriers) {
    if (couriers && couriers.length > 0) {
      const courier = couriers[0];
      return {
        company: courier.layananKurirId,
        type: courier.layananKurirServiceId,
      };
    }
    throw new BadRequestException("No couriers available.");
  }

  _createBasketData(items, shippingFee) {
    return [
      ...items.map((item) => ({
        reference_id: item.id || "",
        name: item.name,
        category: item.category || "",
        currency: "IDR",
        price: item.value,
        quantity: item.quantity || 1,
        type: "PRODUCT",
      })),
      {
        reference_id: "admin_fee",
        name: "Admin Fee",
        category: "Fee",
        currency: "IDR",
        price: 5000,
        quantity: 1,
        type: "FEE",
      },
      {
        reference_id: "shipping_fee",
        name: "Shipping Fee",
        category: "Shipping",
        currency: "IDR",
        price: shippingFee,
        quantity: 1,
        type: "FEE",
      },
    ];
  }

  _createOrderData(product, buyerDetails, shipmentId, buyerId, price) {
    return {
      id_shipment: shipmentId,
      price: price,
      address: buyerDetails.address,
      notes: buyerDetails.note,
      status: "Pending",
      receivedName: buyerDetails.contactName,
      receivednoHandphone: buyerDetails.contactPhone,
      buyerId,
      productId: product.id,
    };
  }

  _createPaymentData(idShipment,price, basketData, metadata) {
    return createQRPaymentObject(
      {
        reference_id: idShipment,
        type: "DYNAMIC",
        currency: "IDR",
        amount: price,
        channel_code: "ID_DANA",
        expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      },
      basketData,
      metadata
    );
  }
}

export default new OrderedProductService();
