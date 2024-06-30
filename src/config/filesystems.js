import express from "express";
import path from "path";

export const filesystems = (app) => {
    app.use("/css", express.static(path.join(__dirname, "../public/css")));
    app.use("/js", express.static(path.join(__dirname, "../public/js")));
    app.use("/img", express.static(path.join(__dirname, "../public/img")));
};
