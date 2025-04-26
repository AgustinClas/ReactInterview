
import React, { useState } from 'react'
import Piece from "../interfaces/piece";

interface ModalNewPieceProps {
    onSave:(piece: Piece) => void;
    onClose:() => void;
}

const ModalNewPiece:React.FC<ModalNewPieceProps> = ({onSave, onClose}) => {

    const [form, setForm] = useState<Piece>({
        name: "",
        material: "",
        ancho: "",
        largo: "",
        tipo: "",
    });

    const [errors, setErrors] = useState<Partial<Record<keyof Piece, string>>>({});

    const validate = () => {
        const newErrors: Partial<Record<keyof Piece, string>> = {};
        if (!form.name) newErrors.name = "Nombre requerido";
        if (!form.material) newErrors.material = "Material requerido";
        if (!form.ancho || isNaN(Number(form.ancho))) newErrors.ancho = "Ancho inválido";
        if (!form.largo || isNaN(Number(form.largo))) newErrors.largo = "Largo inválido";
        if (!form.tipo) newErrors.tipo = "Tipo requerido";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (validate()) {
            onSave(form);
            onClose();
        }
    };

    return (
        <div style={styles.backdrop}>
            <div style={styles.modal}>
                <h2>Nueva Pieza</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    {["name", "material", "ancho", "largo", "tipo"].map((field) => (
                        <div key={field}>
                            <input
                                name={field}
                                placeholder={field}
                                value={(form as any)[field]}
                                onChange={handleChange}
                            />
                            {errors[field as keyof Piece] && (
                                <div style={{ color: "red" }}>{errors[field as keyof Piece]}</div>
                            )}
                        </div>
                    ))}
                    <div style={styles.buttons}>
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={() => onClose()}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const styles = {
    backdrop: {
        position: "fixed" as const,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        width: "300px",
    },
    form: {
        display: "flex",
        flexDirection: "column" as const,
        gap: "0.5rem",
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between",
    },
};


export default ModalNewPiece;