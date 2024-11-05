import OrderedProduct from "./orderedProduct.entity.js";
import { createShippingRequestDTO } from "../BiteShip/dto/createShipmentDTO.js";
import JenisProduct from "../jenisProducts/jenisProduct.entity.js";
import SubCategoryProduct from "../subCategoryProduct/subCategoryProduct.entity.js";
import User from "../user/user.entity.js";
import Product from "../product/product.entity.js";
import AuthPenjual from "../authPenjual/authPenjual.entity.js";
import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import userService from "../user/user.service.js";
import ForbiddenException from "../common/execeptions/ForbiddenException.js";
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
      const updatedOrder = await this.orderedProductRepository.update(
        { status: newStatus },
        { where: { id_shipment: orderId } }
      );

      if (updatedOrder[0] === 0) {
        throw new BadRequestException("Order not found or status update failed.");
      }

      return { message: "Order status updated successfully", status: newStatus };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async create(OrderData) {
    const transaction = await sequelize.transaction(); // Begin transaction
    try {
      const { id_barang, shipping, buyerId, buyerData } = OrderData;
      const { courierId } = shipping;

      const product = await this._getProductDetails(id_barang, courierId);
      const buyerDetails = this._mapBuyerDetails(buyerData);
      const penjual = this._mapPenjualDetails(product);

      const items = this._createItemDetails(product);
      const courierDetails = this._getCourierDetails(product.penjual.AuthPenjual.KurirPenjuals);

      const createShipmentData = createShippingRequestDTO(penjual, buyerDetails, courierDetails, items);
      const draftOrders = await biteshipService.createShipment(createShipmentData);
      const shippingFee = draftOrders.price;
      const idShipment = draftOrders.id;


      const basketData = this._createBasketData(items, shippingFee);
      const orderData = this._createOrderData(product, buyerDetails, shippingFee,idShipment, buyerId);

      const metadataPayment = {
        id_shipment: idShipment
      }

      const createdOrder = await this.orderedProductRepository.create(orderData, { transaction });  
      const paymentData = this._createPaymentData(createdOrder, basketData,metadataPayment);

      console.log(paymentData)

      const payment = await xenditService.createQrPayment(paymentData);
      await transaction.commit(); // Commit transaction if successful

      return payment;
    } catch (error) {
      console.log(error)
      await transaction.rollback(); // Roll back transaction on error
      throw error;
    }
  }

  async _getProductDetails(id_barang, courierId) {
    const product = await this.productRepository.findOne({
      attributes: ["id", "name", "price", "isAvailable", "discount", "weight", "volumePanjang", "volumeLebar", "volumeTinggi"],
      include: [
        { model: JenisProduct, attributes: ["id", "name"] },
        { model: SubCategoryProduct, attributes: ["id", "name"] },
        {
          model: User,
          as: "penjual",
          attributes: ["username","noHandphone"],
          include: [
            {
              model: AuthPenjual,
              attributes: ["alamat", "kodePos"],
              include: [
                {
                  model: KurirPenjual,
                  attributes: ["id", "layananKurirId", "layananKurirServiceId"],
                  where: { id: courierId },
                },
              ],
            },
          ],
        },
      ],
      where: { id: id_barang, isAvailable: true },
      nest: true,
    });

    if (!product) throw new BadRequestException("The product is not on sale.");
    if (!product.penjual.AuthPenjual) throw new BadRequestException("Shipping information is incorrect.");
    return product;
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
    return [
      {
        id: product.id,
        name: product.name,
        category: product.JenisProduct.name,
        value: product.price,
        quantity: 1,
        height: product.volumeTinggi,
        length: product.volumePanjang,
        weight: product.weight,
        width: product.volumeLebar,
      },
    ];
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

  _createOrderData(product, buyerDetails, shippingFee, shipmentId,buyerId) {
    return {
      id_shipment: shipmentId,
      price: product.price + 5000 + shippingFee,
      address: buyerDetails.address,
      notes: buyerDetails.note,
      status: "Pending",
      receivedName: buyerDetails.contactName,
      receivednoHandphone: buyerDetails.contactPhone,
      buyerId,
      productId: product.id,
    };
  }

  _createPaymentData(createdOrder, basketData,metadata) {
    return createQRPaymentObject(
      {
        reference_id: createdOrder.id,
        type: "DYNAMIC",
        currency: "IDR",
        amount: createdOrder.price,
        channel_code: "ID_DANA",
        expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      },
      basketData,
      metadata
    );
  }
}

export default new OrderedProductService();
