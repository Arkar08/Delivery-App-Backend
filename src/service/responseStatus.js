

export const responseStatus = (data)=>{

    const dataList = {
        status:data.status,
        success:data.success,
        length:data.data && data.data.length ,
        data:data.data,
        message:data.message
    }

    return data.res.status(data.status).json(dataList)
}