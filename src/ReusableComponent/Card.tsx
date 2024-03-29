import React, { useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@/src/app/redux/Store/store';
import {FaRegPenToSquare, FaTrashCan} from "react-icons/fa6";
import ManageNoteForm from "./ManageNoteForm";
import {deleteNote, fetchAllNotes} from "@/src/app/redux/Slices/NoteThunk";

interface CardProps {
    className?: string;
    id: string;
    title: string;
    description: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
}

const Card: React.FC<CardProps> = ({ title, id,description }) => {
    const [isManageNoteFormOpen, setIsManageNoteFormOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const { data } = useSelector((state: any) => state.notes);

    const openManageNoteForm = () => {
        setIsManageNoteFormOpen(true);
    };

    const closeManageNoteForm = () => {
        setIsManageNoteFormOpen(false);
    };

    function handleDelete(id: string) {
        // Ask the user for confirmation
        const confirmDelete = window.confirm('Are you sure you want to delete this note?');

        if (confirmDelete) {
            // If user confirms, proceed with deletion
            dispatch(deleteNote(id)).then(() => {
                dispatch(fetchAllNotes());
            });
        }
    }



    return (
        <div
            className="relative flex bg-amber-400  w-70 flex-col rounded  bg-clip-border text-gray-900 shadow-md border-2 border-blue-700">
            <div className="flex flex-col gap-4 p-3  ">
                <div className='text-black font-extrabold py-1 px-1'>
                    Note
                </div>
                <div className="relative  h-11 w-full min-w-[200px]">
                    <input
                        placeholder=""
                        readOnly  value={title}
                        className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        name="title"
                    />
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Title
                    </label>
                </div>

                <div className="relative h-70 w-full min-w-[200px]">
                    <textarea
                        className=" form-control peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        readOnly
                        rows={6}
                        value={description}/>
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Description
                    </label>
                </div>
            </div>
            <div>
                <div className="flex justify-end items-end p-4">
                    <i className="cursor-pointer mr-4" >
                        <FaRegPenToSquare size={20}  onClick={openManageNoteForm}/>
                    </i>
                    <i className="cursor-pointer mr-1" >
                        <FaTrashCan size={20} onClick={() => handleDelete(id)} />
                    </i>
                </div>
            </div>
            {isManageNoteFormOpen && (
                <ManageNoteForm
                    id={id}
                    title={title}
                    description={description}
                    onClose={closeManageNoteForm}
                />
            )}
        </div>
    )
        ;
}

export default Card;
