import axios from 'axios';

const Node = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {},
    actions: {
        async getNodeAllApi() {
            return axios({
                method: 'GET',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node/all`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(
                (response) => response.data,
                (error) => {
                  console.log(error);
                },
              ).catch(
                (message) => {
                  console.log(message);
                },
            );
        },

        async getNodeParamApi(context, param) {
            return axios({
                method: 'GET',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node/${param}`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            }).then(
                (response) => response.data,
                (error) => {
                  console.log(error);
                },
              ).catch(
                (message) => {
                  console.log(message);
                },
            );
        },

        async getNodeBodyApi(context, body) {
            return axios({
                method: 'GET',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                data: body,
            }).then(
                (response) => response.data,
                (error) => {
                  console.log(error);
                },
              ).catch(
                (message) => {
                  console.log(message);
                },
            );
        },

        async postNodeBodyApi(context, body) {
            return axios({
                method: 'POST',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                data: body,
            }).then(
                (response) => response.data,
                (error) => {
                  console.log(error);
                },
              ).catch(
                (message) => {
                  console.log(message);
                },
            );
        },

        async patchNodeBodyApi(context, body) {
            return axios({
                method: 'PATCH',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                data: body,
            }).then(
                (response) => response.data,
                (error) => {
                  console.log(error);
                },
              ).catch(
                (message) => {
                  console.log(message);
                },
            );
        },

        async patchNodeStarBodyApi(context, body) {
            return axios({
                method: 'PATCH',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node/star`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                data: body,
            }).then(
                (response) => response.data,
                (error) => {
                  console.log(error);
                },
              ).catch(
                (message) => {
                  console.log(message);
                },
            );
        },

        async deleteNodeBodyApi(context, body) {
            return axios({
                method: 'DELETE',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node`,
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                data: body,
            }).then(
                (response) => response.data,
                (error) => {
                  console.log(error);
                },
              ).catch(
                (message) => {
                  console.log(message);
                },
            );
        },
    },
    modules: {},
};

export default Node;
