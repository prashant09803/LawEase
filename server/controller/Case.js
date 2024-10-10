const Case = require("server/models/Case")
const User = require("server/models/User")
const { uploadToCloudinary } = require("server/utils/uploadToCloudinary")

exports.createCase = async(req,res) => {
    console.log(req.body)
    try {
        const userId = req.user.id

        let {
            description,
            status,
            serviceProvider,
            caseAudio,
            instructorId
        } = req.body

        const doc = req.files.caseDocument

        if(!description || !serviceProvider || !caseAudio || !instructorId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if(!status || status == "undefined") {
            status = "Open"
        }

       //upload casedocument to cloudinary
        const caseDocument = await uploadToCloudinary(
            doc,
            process.env.FOLDER_NAME
        )
        console.log("CaseDocument: ", caseDocument)

        //create a new case
        const newCase = await Case.create({
            description,
            status,
            serviceProvider,
            caseAudio,
            caseDocument: caseDocument.secure_url,
            userId,
            instructorId
        })

        //put a case in a user case collection
        await User.findByIdAndUpdate(
            {
                id: userId
            },
            {
                $push: {
                    cases: newCase._id
                }
            },
            {new: true}
        );

        //put case in a pendingCases of a Provider
        await User.findByIdAndUpdate(
            {
                id: serviceProvider
            },
            {
                $push: {
                    pendingCases: newCase._id
                }
            },
            {new: true}
        )


        return res.status(200).json({
            success: true,
            data: newCase,
            message: "Case created successfully"
        })

    }
    catch(error) {
        console.log(error)
        return res.status(400).json({ success: false, message: "Error while creating case" })
    }
}