import mongoose from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://epshivangchauhan001819:W2sYwuZmmktYsfma@cluster0.tvoq0vr.mongodb.net/food-del').then(() => console.log("DB Connected"));
}