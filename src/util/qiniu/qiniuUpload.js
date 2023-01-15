import { axiosReq } from '@src/util/request/axios'
import { message } from 'antd'

const qiniu = require('qiniu-js')

function getConfig() {
    return new Promise((resolve, reject) => {
        axiosReq.get('/oss/getConfig').then(
            (value) => {
                resolve(value.data);
            },
            (reason) => {
                reject(reason.message)
            }
        )
    })
}

export default function uploadImg(file) {
    return new Promise((resolve, reject) => {
        getConfig().then(
            (value) => {
                const { token, prefix } = value
                const observer = {
                    next(res) {

                    },
                    error(err) {
                        message.error(err.message)
                        return reject(err.message)
                    },
                    complete(res) {
                        message.info('上传成功')
                        return resolve(prefix + '/' + res.key)
                    }
                }
                const observable = qiniu.upload(file, null, token, {}, {})
                const subscription = observable.subscribe(observer)
            },
            (reason) => {
                message.error(reason)
                reject(reason)
            }
        )
    })
}