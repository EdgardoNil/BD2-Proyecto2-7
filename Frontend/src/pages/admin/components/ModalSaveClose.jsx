import { useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { Label } from '../../../ui/components';
import { useModal } from '../context/ModalContext';
import { createAuthor } from '../helpers';

export const ModalSaveClose = ({ onNewAuthor }) => {
    const { showModal, closeModal } = useModal();

    const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
    const [selectedTags, setSelectedTags] = useState([]);
    const [search, setSearch] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [foto, setFoto] = useState(null);
    const [foto64, setFoto64] = useState(null);


    const addAutor = async () => {
        const dataAutor = {
            nombre,
            biografia,
            foto_base64: foto64,
            libros: selectedTags
            // selectedTags
        }

        const respuesta = await createAuthor(dataAutor);
        onNewAuthor(respuesta.author, respuesta);
        
        closeModal();
    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFoto(event.target.result);
                const base64String = reader.result.split(',')[1];
                setFoto64(base64String);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    const handleSelectChanges = (option) => {
        setOptions(options.filter(opt => opt !== option));
        setSelectedTags([...selectedTags, option]);
        setSearch('');
        setDropdownVisible(false);
    };

    const handleRemoveTag = (tag) => {
        setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        setOptions([...options, tag]);
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(search.toLowerCase())
    );

    const {
        nombre,
        biografia,
        onInputChange,
    } = useForm({
        nombre: '',
        biografia: '',
    });

    return (
        <>
            {showModal ? (
                <>
                    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full my-6 mx-auto max-w-5xl"> {/* Cambiado a max-w-5xl y w-full */}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto"> {/* Añadido overflow-y-auto */}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Agregar Autor</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                        <div className="flex ">
                                            <div className="w-1/3 bg-gray-200 p-4 mr-3">
                                                <p>Foto del autor</p>
                                                {foto && (
                                                    <img
                                                        src={foto}
                                                        alt="Preview"
                                                        className="max-w-full max-h-96 mb-4 rounded-lg shadow-lg"
                                                        style={{ maxHeight: '150px' }}
                                                    />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="sr-only"
                                                    id="image-upload"
                                                />
                                                <label
                                                    htmlFor="image-upload"
                                                    className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                                                >
                                                    Seleccionar Foto
                                                </label>
                                            </div>
                                            <div className="w-2/3 bg-gray-200 p-4">
                                                <Label htmlFor="nombre">Nombre:</Label>
                                                <div className="relative flex w-full flex-wrap items-stretch mb-3">

                                                    <input
                                                        type="text"
                                                        className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                                                        name="nombre"
                                                        value={nombre}
                                                        onChange={onInputChange}
                                                        placeholder="Nombre"
                                                    />
                                                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4">
                                                        <i className="fas fa-user"></i>
                                                    </span>
                                                </div>

                                                <Label htmlFor="biografia">Biografía:</Label>
                                                <textarea
                                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                                    name="biografia"
                                                    value={biografia}
                                                    onChange={onInputChange}
                                                    placeholder="Agregar biografía"
                                                />

                                            </div>

                                        </div>



                                        <div className="w-full mt-10">
                                            <input
                                                type="text"
                                                className="w-full bg-gray-200 text-gray-700 p-2 rounded-md mb-4"
                                                placeholder="Agregar libros..."
                                                value={search}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);
                                                    setDropdownVisible(true);
                                                }}
                                                onFocus={() => setDropdownVisible(true)}
                                            />
                                            {dropdownVisible && filteredOptions.length > 0 && (
                                                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                                                    {filteredOptions.map((option, index) => (
                                                        <li
                                                            key={index}
                                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                                            onClick={() => handleSelectChanges(option)}
                                                        >
                                                            {option}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            <div className="flex flex-wrap gap-2">
                                                {selectedTags.map((tag, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center bg-blue-500 text-white rounded-full px-3 py-1"
                                                    >
                                                        <span>{tag}</span>
                                                        <i
                                                            className="fa-solid fa-x ml-2 bg-transparent hover:bg-blue-700 text-white font-bold rounded-full focus:outline-none"
                                                            onClick={() => handleRemoveTag(tag)}
                                                        ></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={addAutor}
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
};
