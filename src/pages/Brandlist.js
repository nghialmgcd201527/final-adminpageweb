import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABrand, getBrands, resetState } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom'
import { BiEdit } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import CustomModal from '../components/CustomModal';

const columns = [
    {
        title: 'SNo',
        dataIndex: 'key',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'Action',
        dataIndex: 'action',
    }
];

const Brandlist = () => {
    const [open, setOpen] = useState(false);
    const [brandId, setBrandId] = useState('');
    const showModal = (e) => {
        setOpen(true);
        setBrandId(e)
    };

    const hideModal = () => {
        setOpen(false);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(resetState())
        dispatch(getBrands())
        // eslint-disable-next-line
    }, [])

    const brandState = useSelector((state) => state.brand.brands)
    const data1 = [];
    for (let i = 0; i < brandState.length; i++) {
        data1.push({
            key: i + 1,
            name: brandState[i].title,
            action: (
                <>
                    <Link to={`/admin/brand/${brandState[i]._id}`} className='fs-3 text-danger'>
                        <BiEdit />
                    </Link>
                    <button to='/' className='ms-3 fs-3 text-danger bg-transparent border-0' onClick={() => showModal(brandState[i]._id)}>
                        <AiFillDelete />
                    </button>
                </>
            )
        });
    }
    const deleteBrand = (e) => {
        dispatch(deleteABrand(e))
        setOpen(false)
        setTimeout(() => {
            dispatch(getBrands())
        }, 500)
    }
    return (
        <div>
            <h3 className="mb-4 title">Brands</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => { deleteBrand(brandId) }}
                title='Are you sure to delete this brand?'
            />
        </div>
    )
}

export default Brandlist