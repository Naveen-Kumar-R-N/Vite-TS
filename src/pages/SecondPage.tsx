// src/pages/SecondPage.tsx
import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Post } from '../models/Post';
import axios from 'axios';
import DepartmentList from '../components/DepartmentList';
import { Typography } from '@mui/material';


const columns: GridColDef[] = [
  { field: 'userId', headerName: 'User ID', width: 150 },
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'body', headerName: 'Body', width: 500 },
];

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      });
  }, []);

  return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom sx={{}}>Table</Typography>
            <DataGrid rows={posts} columns={columns} style={{ height: 400 }} />
            <Typography variant="h4" component="h1" gutterBottom sx={{marginTop: '30px'}}> Expand / Collapase</Typography>
            <DepartmentList />
        </div>
  );
};

export default SecondPage;
