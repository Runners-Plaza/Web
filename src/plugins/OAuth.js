import Vue from 'vue'

const OAuth = {
    install(Vue) {
        Vue.prototype.oauth = {
            clearTokenData() {
                window.localStorage.removeItem('tokenData')
            },
            getTokenData() {
                let tokenData = JSON.parse(window.localStorage.getItem('tokenData'))
                if (tokenData === null ||
                    typeof tokenData.accessToken === 'undefined' ||
                    typeof tokenData.expiredAt === 'undefined' ||
                    new Date().getTime() / 1000 > tokenData.expiredAt - 300) {
                    this.clearTokenData()
                    return null
                } else {
                    return tokenData
                }
            },
            setTokenData(tokenData) {
                tokenData = {
                    accessToken: tokenData.accessToken,
                    expiredAt: parseFloat(tokenData.expiresIn) + new Date().getTime() / 1000,
                }
                window.localStorage.setItem('tokenData', JSON.stringify(tokenData))
                return tokenData
            }
        }
    }
}

Vue.use(OAuth)