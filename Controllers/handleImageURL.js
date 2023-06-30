const handleImageURL = (req,res,ClarifaiStub,grpc) => {
const {imageURL} = req.body;
const PAT = '697d591472b14a4c9fafda9e3facf5ae';
const USER_ID = '9qnqroy1xb35';
const APP_ID = 'test';
const MODEL_ID = 'face-detection';
const IMAGE_URL = imageURL;
const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + PAT);

stub.PostModelOutputs(
    {
        user_app_id: {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        model_id: MODEL_ID,
        inputs: [
            { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } }
        ]
    },
    metadata,
    (err, response) => {
        if (err) {
            return res.status(400).json(err);
        }

        if (response.status.code !== 10000) {
            return res.status(400).json(response.status.description);
        }
        const output = response;
        res.json(output);
    }

);
}

export default handleImageURL;