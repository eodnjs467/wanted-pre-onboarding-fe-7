import axios from "axios";

export const baseUrl = "https://pre-onboarding-selection-task.shop/";

export const API = axios.create({
    baseURL: baseUrl,
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  });