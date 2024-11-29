import BlogModel from '../models/Blog.js';


class DashBoardController {
    static loadUser = async (req, res, next) => {
        try {
            const noOfPage = 20;
            let { skip } = req.body;
            if (!skip) {
                skip = 1;
            }
            const nextresult = (skip - 1) * noOfPage
            // console.log(skip);
            const results = await BlogModel.find().skip(nextresult).limit(noOfPage);
            // console.log(results);
            res.send({ data: "data", data: results });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static blogList = async (req, res, next) => {
        try {
            // console.log(skip);
            const results = await BlogModel.find();
            // console.log(results);
            res.send({ data: "data", result: results });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
        }
    }
    static detailBlog = async (req, res, next) => {
        try {
            const blogid = req.params['id'];
            const results = await UserModel.findById(
                blogid
            );
            res.send({ data: "data", result: results });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
        }
    }
    static draftBlog = async (req, res, next) => {
        try {
            const user = req.user;
            const role = user['role'];
            if (role !== 'editor') {
                res.send({ error: "something is misssing in db" });
            }
            const results = await DataModel.find({ state: 'under review' });
            res.send({ data: "data", result: results });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
        }
    }
    static saveDraftBlog = async (req, res, next) => {
        try {
            const user = req.user;
            const role = user['role'];
            if (role !== 'contributor') {
                res.send({ error: "something is misssing in db" });
            }
            const { content, title, userid } = req.body;
            const newblog = new DataModel({
                content: content,
                title: title,
                author: userid,
            });
            const blog = await newblog.save();

            res.send({ data: "data", result: blog });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static saveBlog = async (req, res, next) => {
        try {
            const user = req.user;
            const role = user['role'];
            if (role !== 'editor') {
                res.send({ error: "something is misssing in db" });
            }
            // console.log(skip);
            const blogid = req.params['id'];
            const {state}=req.body
            const results = await UserModel.findByIdAndUpdate(
                blogid,                // The user's _id (no need for { _id: id })
                { $set: { state: state } }, // The update operation (set the role to newRole)
                { new: true }      // Option to return the updated document
            );
            
            res.send({ data: "data", result: results });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static deleteBlog = async (req, res, next) => {
        try {
            const user = req.user;
            const role = user['role'];
            if (role !== 'editor') {
                res.send({ error: "something is misssing in db" });
            }
            // console.log(skip);
            const blogid = req.params['id'];
            const results = await UserModel.findByIdAndUpdate(
                blogid
            );
            res.send({ data: "data", result: results });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }

}
export default DashBoardController;