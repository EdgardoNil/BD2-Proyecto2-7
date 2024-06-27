import { useEffect, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { Label } from '../../../ui/components';
import { useModal } from '../context/ModalContextBooks';
import { createBook, getAuthors } from '../helpers';

export const ModalAddBook = ({ onNewBook }) => {
    const { showModal, closeModal } = useModal();

    const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3', 'Option 4']);
    const [selectedTags, setSelectedTags] = useState([]);
    const [search, setSearch] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [foto, setFoto] = useState(null);
    const [foto64, setFoto64] = useState(null);
    const [autores, setAutores] = useState([])
    const [autorText, setAutorText] = useState([])
    const [autorId, setAutorId] = useState(null)

    const fetchData = async () => {

        const respuesta = await getAuthors();
        setAutores(respuesta);

    }

    useEffect(() => {
        fetchData();
    }, [])


    const addBook = async () => {
        const dataBook = {
            titulo,
            autor: autorText,
            author_id: autorId,
            descripcion,
            genero,
            fecha_publicacion,
            disponibilidad: disponibilidad === 'si' ? true : false,
            cantidad_stock: cantidad_stock * 1,
            puntuacion_promedio: puntuacion_promedio * 1,
            precio: precio * 1,
            foto_base64: foto64,
        }

        const respuesta = await createBook(dataBook);
        console.log(respuesta);
        onNewBook(respuesta.book)
        

        // console.log(dataBook);


    }

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFoto(event.target.result); // Actualizar el estado con la URL de la imagen
                const base64String = reader.result.split(',')[1];
                setFoto64(base64String);
            };
            reader.readAsDataURL(selectedImage); // Leer la imagen como URL
        }
    };

    const handleSelectChanges = (option) => {
        setOptions(options.filter(opt => opt !== option));
        setSelectedTags([...selectedTags, option]);
        // setSearch(option.nombre);
        setSearch('');
        setDropdownVisible(false);
        setAutorText(option.nombre);
        setAutorId(option._id);
    };

    const handleRemoveTag = (tag) => {
        setSelectedTags(selectedTags.filter(selectedTag => selectedTag !== tag));
        setOptions([...options, tag]);
    };

    // const filteredOptions = ['true', 'false']
    // const filteredOptions = 
    const filteredOptions = autores.filter(author =>
        author.nombre.toLowerCase().includes(search.toLowerCase())
    );

    // console.log(autores);
    // return ['true', 'trab'];
    // }

    const {
        titulo,
        autor,
        descripcion,
        genero,
        fecha_publicacion,
        disponibilidad,
        cantidad_stock,
        puntuacion_promedio,
        precio,

        onInputChange,
    } = useForm({
        titulo: '',
        autor: '',
        descripcion: '',
        genero: '',
        fecha_publicacion: '',
        disponibilidad: 'si',
        cantidad_stock: 0,
        puntuacion_promedio: 0,
        precio: 0,
    });

    return (
        <>
            {showModal ? (
                <>
                    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full my-6 mx-auto max-w-5xl"> {/* Cambiado a max-w-5xl y w-full */}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none overflow-y-auto"> {/* Añadido overflow-y-auto */}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Agregar Libro</h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={closeModal}
                                    >
                                        <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                        <div className="flex">
                                            <div className="w-1/3 bg-gray-200 p-4 mr-3">
                                                <p>Foto del libro</p>
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
                                                <div className="flex">
                                                    <div className="flex flex-col mr-3 w-full">
                                                        <Label htmlFor="titulo">Titulo:</Label>
                                                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                                            <input
                                                                type="text"
                                                                className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                                                                name="titulo"
                                                                value={titulo}
                                                                onChange={onInputChange}
                                                                placeholder="Titulo"
                                                            />
                                                            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4">
                                                                <i className="fas fa-heading"></i>
                                                            </span>
                                                        </div>

                                                    </div>
                                                    <div className="flex flex-col w-full">
                                                        <Label htmlFor="autor">Autor:</Label>
                                                        <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                                            <input
                                                                type="text"
                                                                className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                                                                value={autorText}
                                                                onChange={(e) => {
                                                                    setSearch(e.target.value);
                                                                    setDropdownVisible(true);
                                                                }}
                                                                onFocus={() => {
                                                                    setDropdownVisible(true)
                                                                    setAutorText('')
                                                                }}
                                                                // name="autor"
                                                                // value={autor}
                                                                // onChange={onInputChange}
                                                                placeholder="Autor"
                                                            />
                                                            {dropdownVisible && filteredOptions.length > 0 && (
                                                                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                                                                    {filteredOptions.map((autor, index) => (
                                                                        <li
                                                                            key={index}
                                                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                                                            onClick={() => handleSelectChanges(autor)}
                                                                        >
                                                                            {autor.nombre}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                            <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4">
                                                                <i className="fas fa-at"></i>
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>


                                                <Label htmlFor="descripcion">Descripcion:</Label>
                                                <textarea
                                                    className="w-full bg-bg300 text-text200 px-4 py-2 rounded-md"
                                                    name="descripcion"
                                                    value={descripcion}
                                                    onChange={onInputChange}
                                                    placeholder="Agregar descripcion"
                                                />

                                            </div>

                                        </div>

                                        <div className="flex">
                                            <div className="w-1/3 p-4 mr-3">
                                                <Label htmlFor="genero">Genero:</Label>
                                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                                    <input
                                                        type="text"
                                                        className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                                                        name="genero"
                                                        value={genero}
                                                        onChange={onInputChange}
                                                        placeholder="Genero"
                                                    />
                                                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4">
                                                        <i className="fas fa-masks-theater"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-1/3 p-4 mr-3">
                                                <Label htmlFor="fecha_publicacion">Fecha de publicacion:</Label>
                                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                                    <input
                                                        type="date"
                                                        className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                                                        name="fecha_publicacion"
                                                        value={fecha_publicacion}
                                                        onChange={onInputChange}
                                                        placeholder="Fecha de publicacion"
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-1/3 p-4 mr-3">
                                                <Label htmlFor="disponibilidad">Disponibilidad:</Label>
                                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                                    <select
                                                        value={disponibilidad}
                                                        onChange={onInputChange}
                                                        name='disponibilidad'
                                                        className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                                                    >
                                                        <option value="si">Sí</option>
                                                        <option value="no">No</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="w-1/3 p-4 mr-3">
                                                <Label htmlFor="cantidad_stock">Cantidad en stock:</Label>
                                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                                    <input
                                                        type="number"
                                                        className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                                                        name="cantidad_stock"
                                                        value={cantidad_stock}
                                                        onChange={onInputChange}
                                                        placeholder="Stock"
                                                    />
                                                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4">
                                                        <i className="fas fa-boxes-stacked"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-1/3 p-4 mr-3">
                                                <Label htmlFor="puntuacion_promedio">Puntuacion promedio:</Label>
                                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                                    <input
                                                        type="number"
                                                        className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                                                        name="puntuacion_promedio"
                                                        value={puntuacion_promedio}
                                                        onChange={onInputChange}
                                                        placeholder="Puntuacion promedio"
                                                    />
                                                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4">
                                                        <i className="fas fa-star"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="w-1/3 p-4 mr-3">
                                                <Label htmlFor="precio">Precio:</Label>
                                                <div className="relative flex w-full flex-wrap items-stretch mb-3">
                                                    <input
                                                        type="number"
                                                        className="px-3 py-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                                                        name="precio"
                                                        value={precio}
                                                        onChange={onInputChange}
                                                        placeholder="Precio"
                                                    />
                                                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-lg items-center justify-center w-8 right-0 pr-3 py-4">
                                                        <i className="fas fa-dollar-sign"></i>
                                                    </span>
                                                </div>
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
                                        onClick={addBook}
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
