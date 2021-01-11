import axios from 'axios';

const Connect = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {},
    actions: {
        async patchLinkApi(context, body) {
            return axios({
                method: 'PATCH',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node/link`,
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

        async patchUnLinkApi(context, body) {
            return axios({
                method: 'PATCH',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node/unlink`,
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
};

export default Connect;
