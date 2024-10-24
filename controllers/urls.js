import urlModel from '../models/urls.models.js';
import validator from 'validator';
import { nanoid } from 'nanoid';


const getShortUrl = async(req, res)=>{
    const {longurl} = req.body
    
    // Check if url is in valid format
    if(!validator.isURL(longurl.toString())) throw new Error("Url is not a valid format");

    // Check if url exists and can be accessed
    const response = await fetch(longurl)
    if (!response.ok) throw new Error("Url does not exist");

    const base = process.env.BASEURL

    // generate short url
    const shortUrl = `${base}/${nanoid(8)}`

    let url = await urlModel.findOne({ longUrl:longurl })

    if (url) {
        res.status(200).json({
            status: "success",
            data: url
        });
        return;
    }

    const newUrl = new urlModel({
        shortUrl,
        longUrl: longurl,
        userid: req.user ? req.user._id : null,
    });
    await newUrl.save();

    res.status(201).json({
        status: "success",
        data: newUrl,
    });
}

const redirectUrl = async (req, res)=>{
    console.log('Accessed redirectUrl route');
    const {urlID} = req.params
    const shorturl = `${process.env.BASEURL}/${urlID}`

    const originalUrl = await urlModel.findOne({shortUrl:shorturl})

    if (!originalUrl) {
        res.status(404).json({
            status:"failed",
            messsage:"Link not found"
        })
    }
    res.redirect(originalUrl.longUrl)
}

const allUrls  = async (req, res)=>{

    const urls = await urlModel.find({ userid:req.user._id }).sort({ createdAt: -1 })

    res.status(200).json({
        status:"success",
        data: urls
    }) 
}

const deleteUrl = async (req, res)=>{
    const {id} = req.params

    const deleteUrl = await urlModel.findOneAndDelete({_id:id, userid: req.user._id})
    if (!deleteUrl) {
        res.status(404).json({
            status:"failed",
            message:"URL not found or you do not have permission to delete it"
        });
        return;
    }
    res.status(200).json({
        status:"success",
        message:"deleted successfully"
    })
}

const updateUrl = async(req, res)=>{
    const {urlid} = req.params
    const {custom_url, expiry_date} = req.body

    if (custom_url.length < 5 || custom_url.length > 15) throw new Error("Custom name should be be greater than 5 and less than 15 characters");

    const getDuplicateUrl = await urlModel.findOne({ custom_url })

    if (getDuplicateUrl) throw new Error("custom url is taken. try again");

    const updatedUrl = await urlModel.findOneAndUpdate({_id:urlid}, {
        expiry_date,
        custom_url
    }, {
        new: true,
        runValidators:true
    })

    if (!updatedUrl) {
    return res.status(404).json({
        status: "failed",
        message: "URL not found"
    });
    }

    res.status(200).json({
        status: "success",
        data: updatedUrl
    });
}



export {getShortUrl, redirectUrl, allUrls, deleteUrl, updateUrl}