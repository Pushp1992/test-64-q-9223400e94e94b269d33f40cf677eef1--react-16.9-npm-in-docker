import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const LeadService = {
    async getLadsData() {
        const encodedURI = window.encodeURI(`${REACT_APP_API_URL}/api/leads/`);
        try {
            return await axios({
                method: "GET",
                url: encodedURI,
                'headers': {
                    'Content-Type': 'application/json',
                }
            }).then(function (res) {
                return res.data
            })
        } catch (err) {
            console.log(err)
        }
    },
    async addLadsData() {
        const encodedURI = window.encodeURI(`${REACT_APP_API_URL}/api/leads/`);
        try {
            return await axios({
                method: "POST",
                url: encodedURI,
                'headers': {
                    'Content-Type': 'application/json',
                }
            }).then(function (res) {
                return res.data;
            })
        } catch (err) {
            console.log(err)
        }
    },
    async deleteLadsData(id) {
        const encodedURI = window.encodeURI(`${REACT_APP_API_URL}/api/leads/${id}`);
        try {
            return await axios({
                method: "DELETE",
                url: encodedURI,
                'headers': {
                    'Content-Type': 'application/json',
                }
            }).then(function (res) {
                return res;
            })
        } catch (err) {
            console.log(err)
        }
    },
    async updateLadsComm(id,commData) {
        const encodedURI = window.encodeURI(`${REACT_APP_API_URL}/api/mark_lead/${id}`);
        try {
            return await axios({
                method: "PUT",
                url: encodedURI,
                data: commData,
                'headers': {
                    'Content-Type': 'application/json',
                }
            }).then(function (res) {
                return res.data;
            })
        } catch (err) {
            console.log(err)
        }
    },
}

export default LeadService;