import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { useDispatch, useSelector } from 'react-redux';
import { closeLeftSidebar } from '@/store/leftSidebarSlice';

function LeftSidebar() {
    const { isOpen, header } = useSelector((state) => state.leftSidebar);
    const dispatch = useDispatch();

    const closeDrawer = () => {
        dispatch(closeLeftSidebar());
    };

    return (
        <div
            className={
                "fixed overflow-hidden z-20 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                (isOpen ? "transition-opacity opacity-100 duration-100 -translate-x-0" : "transition-all delay-500 opacity-0 -translate-x-full")
            }
        >
            <section
                className={
                    "w-80 md:w-96 left-0 absolute bg-base-100 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
                    (isOpen ? "-translate-x-0" : "-translate-x-full")
                }
            >
                <div className="relative pb-5 flex flex-col h-full">
                    {/* Header */}
                    <div className="navbar flex pl-4 pr-4 justify-between shadow-md">
                        <span className="font-bold text-xl">{header}</span>
                        <button className="btn btn-circle btn-outline btn-sm" onClick={closeDrawer}>
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="overflow-y-scroll pl-4 pr-4">
                        <div className="flex flex-col w-full">
                            <p>Content related to GST and ITR filing will go here.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-screen h-full cursor-pointer" onClick={closeDrawer}></section>
        </div>
    );
}

export default LeftSidebar;