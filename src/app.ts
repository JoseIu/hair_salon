import express from "express";

const expressApp = express();

const PORT = 3000;

expressApp.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
