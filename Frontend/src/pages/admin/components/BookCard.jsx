import { useModal } from "../context/ModalContextBooks";

export const BookCard = ({
    titulo,
    imagen_url,
    precio,
    disponibilidad,
    descripcion,
    autor,
    genero,
    cantidad_stock,
    puntuacion_promedio,
    fecha_publicacion,
    libro,
}) => {

    const { openModalUpdatedBook, openModalDeletedBook } = useModal();

    return (
        <>
            {/* <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"> */}
            <div className="w-full my-5 items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden animate__animated animate__fadeIn">
                    <div style={{backgroundColor: '#D6DBDF'}} className='text-center'>
                    <h5 className="text-lg font-bold truncate">{titulo}</h5>
                    </div>

                    <div className="flex mb-3">
                        <div className="w-1/3 text-center">
                            <img
                                src={imagen_url}
                                alt={"titulo"}
                                className="w-full max-h-50"
                            />
                        </div>
                        <div className="w-2/3">
                            <div className="p-4 pb-0">
                                {/* <h5 className="text-lg font-bold truncate">{"titulo"}</h5> */}
                                <p className="text-sm">
                                    <i className="fa-solid fa-dollar-sign text-yellow-500"></i> Precio: $.{precio}
                                </p>
                                <p className="text-sm">
                                    Disponible: <span style={{ color: disponibilidad ? 'green' : 'red' }}><b>{disponibilidad ? "Si" : "No"}</b></span>
                                </p>
                                <hr style={{marginBottom: '0.5rem'}}/>
                                <p className=" text-justify truncate-multiline-4">
                                    <small className="text-gray-600">Descripcion: {descripcion}</small>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mb-3">
                        <div className="w-1/3 text-center">
                            <small className="font-bold">Autor:</small>
                            <p className="truncate-2-lines">
                                <small className="font-bold">{autor}</small>
                            </p>
                            <small>{fecha_publicacion}</small>
                        </div>
                        <div className="w-2/3">
                            <div className="p-2">
                                <div className="flex justify-between">
                                    <div className="text-center">
                                        <p><small>Genero</small></p>
                                        <i className="fa-solid fa-masks-theater"></i>
                                        <p><small>{genero}</small></p>
                                    </div>
                                    <div className="text-center">
                                        <p><small>Stock</small></p>
                                        <i className="fa-solid fa-boxes-stacked"></i>
                                        <p><small>{cantidad_stock}</small></p>
                                    </div>
                                    <div className="text-center">
                                        <p><small>Puntuacion</small></p>
                                        <i className="fa-solid fa-star"></i>
                                        <p><small>{puntuacion_promedio}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between pt-3">
                        <div
                            className="w-1/2 text-center cursor-pointer"
                            onClick={(e) => {
                                openModalUpdatedBook(libro);
                            }}
                        >
                            <i className="fa-solid fa-pen text-green-500"></i>
                            <p><small className="font-bold">Editar</small></p>
                        </div>
                        <div
                            className="w-1/2 text-center cursor-pointer"
                            onClick={(e) => {
                                openModalDeletedBook(libro);
                            }}
                        >
                            <i className="fa-solid fa-trash text-red-500"></i>
                            <p><small className="font-bold">Borrar</small></p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
