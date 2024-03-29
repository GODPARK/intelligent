import axios from 'axios';

const Search = {
    namespaced: true,
    state: {
    },
    getters: {
    },
    mutations: {},
    actions: {
        async getSearchKeywordApi(context, param) {
            return axios({
                method: 'GET',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node/search/${encodeURI(encodeURIComponent(param))}`,
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

        async getSearchCategoryApi(context, param) {
            return axios({
                method: 'GET',
                url: `${process.env.VUE_APP_BACKEND_IP}/api/node/category/${encodeURI(encodeURIComponent(param))}`,
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
    },
};

export default Search;
