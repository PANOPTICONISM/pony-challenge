import axios from "axios";

export const requester = axios.create({
	baseURL: "https://ponychallenge.trustpilot.com",
});