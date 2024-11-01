import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import dotenv from "dotenv";

dotenv.config();

class BiteShipService {
  constructor() {
    this.accessToken = process.env.BiteShipAccessToken;
    this.BASEURLBITESHIP = process.env.BiteShipBaseURL;
  }

  async showListKurir(courierCode = "") {
    const baseURL = `${this.BASEURLBITESHIP}/v1/couriers`;

    try {
      // Fetch the data from the API
      const response = await fetch(baseURL, {
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

    // console.log(input);
    // Encode the query to replace spaces with '+'
    const queryStr = String(input);
    const encodedQuery = queryStr.includes(" ") ? queryStr.replace(/\s+/g, "+") : queryStr;
    // console.log(encodedQuery);
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
}

export default new BiteShipService();
