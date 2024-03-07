import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addNote, deleteNote, editNote, fetchAllNotes, getNote} from "@/src/app/redux/Slices/NoteThunk";
import { AppDispatch } from "@/src/app/redux/Store/store";
import { useRouter } from "next/navigation";

interface ManageNoteFormProps {
    id: string;
    title: string;
    description: string;
    onClose: () => void;
}
const ManageNoteForm: React.FC<ManageNoteFormProps> = ({
                                                           id,
                                                           title: initialTitle,
                                                           description: initialDescription,
                                                           onClose,
                                                       }) => {
    const [modalOpen, setModalOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const dispatch = useDispatch<AppDispatch>();
    const [showManageTaskForm, setShowManageTaskForm] = useState(true);
    const { note } = useSelector((state: any) => state.notes);
    const router = useRouter();

    useEffect(() => {
        dispatch(getNote(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setDescription(note.description);
        }
    }, [note]);

    useEffect(() => {
        if (!id) {
            setTitle('');
            setDescription('');
        }
    }, [id]);
    const handleEdit = async () => {
        try {
            // Ask the user for confirmation
            const confirmUpdate = window.confirm('Are you sure you want to update this note?');

            if (!confirmUpdate) {
                return;
            }

            setLoading(true);
            if (!title && !description) return;
            await dispatch(editNote({ noteData: { title, description }, id }));
            setShowManageTaskForm(false);
            setDescription('');
            setTitle('');
            dispatch(fetchAllNotes()); // Fetch updated notes

            // Notify the user of the successful update
            // alert('Note updated successfully');
        } catch (error) {
            console.error('Error editing data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            // Ask the user for confirmation
            /*const confirmSave = window.confirm('Are you sure you want to save this note?');

            if (!confirmSave) {
                return;
            }*/

            setLoading(true);
            if (!title && !description) return;
            await dispatch(addNote({ title, description }));
            setShowManageTaskForm(false);
            setDescription('');
            setTitle('');
            dispatch(fetchAllNotes()); // Fetch updated notes

            /*alert('Note saved successfully');*/
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            setLoading(false);
        }
    };



    const toggleModal = () => {
        setDescription('');
        setTitle('');
        onClose();
    };

    const openModal = () => {
        setModalOpen(false);
    };

    function close() {
        setDescription('');
        setTitle('');
        setShowManageTaskForm(false);
    }

    return (
        <>
            {showManageTaskForm && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/2">
                        <span
                            className="absolute top-2 right-2 cursor-pointer text-xl"
                            onClick={toggleModal}
                        >
                            &times;
                        </span>
                        <h2 className="text-2xl font-bold mb-4">Manage Note</h2>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter note title"
                        />
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                            name="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter note description"
                        />

                        <div>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-6"
                                onClick={id ? handleEdit : handleCreate}
                            >
                                {id ? 'Update' : 'Save'}
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                onClick={close}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ManageNoteForm;

