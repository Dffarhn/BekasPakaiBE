import Xendit from "xendit-node";
import BadRequestException from "../common/execeptions/BadRequestExecption.js";
import dotenv from "dotenv";
import { createQRPaymentObject } from "./dto/createQrPayment.js";

dotenv.config();

class XenditService {
  constructor() {
    this.accessToken = process.env.XENDIT_ACCESS_TOKEN;
    this.BaseURL = process.env.XENDIT_BASE_URL;

    // Validate that required environment variables are set
    if (!this.accessToken || !this.BaseURL) {
      throw new Error("Xendit access token or base URL is not set in environment variables.");
    }
  }

  async createQrPayment(orderData) {
    const url = `${this.BaseURL}/qr_codes`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-version": "2022-07-31",
          Authorization: `Basic ${btoa(this.accessToken + ":")}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`Failed to create QR payment: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("QR Payment Created Successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating QR payment:", error);
      throw error;
    }
  }

  async showCodeBank(input) {
    const baseURL = `${this.BaseURL}/payouts_channels?currency=IDR&channel_category=BANK`;
  
    try {
      const response = await fetch(baseURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(this.accessToken + ":")}`,
        },
      });
  
      if (!response.ok) {
        throw new BadRequestException(`Failed to retrieve bank codes: ${response.status} ${response.statusText}`);
      }
  
      let data = await response.json();

  
      // Apply the filter on `channel_name`
      if (input) {
        data = data.filter((item) => item.channel_name.toLowerCase().includes(input.toLowerCase()));
      }
  
      return data
    } catch (error) {
      throw error;
    }
  }
  
}

export default new XenditService();
