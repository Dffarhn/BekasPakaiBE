import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import dotenv from "dotenv";
import { cekOngkirRequestDTO } from "./dto/cekOngkirDto.js";
import orderedProductService from "../orderedProduct/orderedProduct.service.js";

dotenv.config();

class BiteShipService {
  constructor() {
    this.accessToken = process.env.BiteShipAccessToken;
    this.BASEURLBITESHIP = process.env.BiteShipBaseURL;
  }

  async cekOngkir(originPostalCode, destinationPostalCode, couriers, items) {
    const shippingRequestDTO = cekOngkirRequestDTO(originPostalCode, destinationPostalCode, couriers, items);

    const baseURL = `${this.BASEURLBITESHIP}/v1/rates/couriers`;

    try {
      // Fetch the data from the API
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`, // Use your access token here
        },
        body: JSON.stringify(shippingRequestDTO), // Stringify the shipping request DTO
      });

      if (!response.ok) {
        throw new BadRequestException(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse JSON response
      const data = await response.json();
      return data; // Return the API response data
    } catch (error) {
      console.error("Failed to check shipping cost:", error);
      throw error; // Re-throw the error for handling elsewhere
    }
  }
  async showListKurir(courierCode = "") {
    const baseURL = `${this.BASEURLBITESHIP}/v1/couriers`;

    try {
      // Fetch the data from the API
      const response = await fetch(baseURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`, // Use your access token her
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse JSON response
      const data = await response.json();

      // Filter based on courierCode if provided, else return all couriers
      const datakurir = data.couriers
        .filter((courier) => (courierCode ? courier.courier_code.includes(courierCode.toLowerCase()) : true))
        .map((courier) => ({
          courier_name: courier.courier_name,
          courier_code: courier.courier_code,
          courier_service_name: courier.courier_service_name,
          courier_service_code: courier.courier_service_code,
          shipment_duration_range: courier.shipment_duration_range,
          shipment_duration_unit: courier.shipment_duration_unit,
        }));

      return {
        datakurir,
      };
    } catch (error) {
      console.error("Failed to fetch courier list:", error);
      throw error;
    }
  }

  async showPostalCode(penjualAlamatData) {
    const { negara, input } = penjualAlamatData;

    // Encode the query to replace spaces with '+'
    const queryStr = String(input);
    const encodedQuery = queryStr.includes(" ") ? queryStr.replace(/\s+/g, "+") : queryStr;
    // Define the base URL and construct the full URL
    const baseURL = `${this.BASEURLBITESHIP}/v1/maps/areas`;
    const queryURL = `${baseURL}?countries=${negara}&input=${encodedQuery}&type=single`;

    try {
      // Fetch the data from the API
      const response = await fetch(queryURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`, // Use your access token here
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // Parse JSON response
      const data = await response.json();
      // console.log(data)

      // Extract postal codes and transform to desired format
      const nameCodes = data.areas.map((area) => ({
        name: area.name, // Adjust 'area.name' to match the correct property from your API response
      }));

      // console.log(nameCodes);

      return {
        nameCodes,
      };
    } catch (error) {
      console.error("Failed to fetch postal code:", error);
      throw error;
    }
  }

  async createShipment(shipmentDetails) {

    // console.log(shipmentDetails)
    const baseURL = `${this.BASEURLBITESHIP}/v1/draft_orders`;

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
        body: JSON.stringify(shipmentDetails),
      });

      if (!response.ok) {

        console.log(response)
        throw new BadRequestException(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error("Failed to create shipment:", error);
      throw error;
    }
  }

  async confirmOrder(id_shipment) {

    // console.log(shipmentDetails)
    const baseURL = `${this.BASEURLBITESHIP}/v1/draft_orders/${id_shipment}/confirm`;

    try {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {

        console.log(response)
        throw new BadRequestException(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      await orderedProductService.updateOrderStatus(id_shipment,"Pengiriman")
      // console.log(data)
      return data;
    } catch (error) {
      console.error("Failed to create shipment:", error);
      throw error;
    }
  }

  async deleteOrder(id_shipment) {

    // console.log(shipmentDetails)
    const baseURL = `${this.BASEURLBITESHIP}/v1/draft_orders/${id_shipment}`;

    try {
      const response = await fetch(baseURL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      if (!response.ok) {

        console.log(response)
        throw new BadRequestException(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      await orderedProductService.updateOrderStatus(id_shipment,"Pembatalan")
      // console.log(data)
      return data;
    } catch (error) {
      console.error("Failed to create shipment:", error);
      throw error;
    }
  }
}

export default new BiteShipService();
