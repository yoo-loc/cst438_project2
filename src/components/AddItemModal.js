import React from "react";

const AddItemModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                    width: "300px",
                }}
                onClick={(e) => e.stopPropagation()}
            > 
                <form>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Input 1:</label>
                        <input type="text" name="input1" style={{ width: "100%" }} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Input 2:</label>
                        <input type="text" name="input2" style={{ width: "100%" }} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Input 3:</label>
                        <input type="text" name="input3" style={{ width: "100%" }} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Input 4:</label>
                        <input type="text" name="input4" style={{ width: "100%" }} />
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label>Input 5:</label>
                        <input type="text" name="input5" style={{ width: "100%" }} />
                    </div>
                    <button type="submit" style={{ width: "100%" }}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;
