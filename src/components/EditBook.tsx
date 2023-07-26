import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from '@/redux/Features/Books/BooksApi';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

interface formType {
  title: string;
  author: string;
  genre: string;
  year: string;
}

const EditBook = () => {
  const [data, setData] = useState<formType>({
    title: '',
    author: '',
    genre: '',
    year: '',
  });

  const { id } = useParams();

  const { data: singleData } = useSingleBookQuery(id);

  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();

  // Handle Change Function
  const InputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Form handling Area
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const options = {
      id: id,
      data: data,
    };

    try {
      const response = await updateBook(options);

      if ('data' in response) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate(`/book-details/${id}`);
        }, 1000);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };
  return (
    <div className="mt-5">
      <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>
        Edit Book
      </Typography>
      <Card sx={{ padding: '10px 5px', maxWidth: 450, margin: ' 0 auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
                  defaultValue={singleData?.data?.title}
                  required
                  id="filled-basic"
                  label="Name"
                  variant="filled"
                  name="title"
                  onChange={InputValue}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  defaultValue={singleData?.data?.author}
                  required
                  id="filled-basic"
                  label="author"
                  type="name"
                  variant="filled"
                  name="author"
                  onChange={InputValue}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  defaultValue={singleData?.data?.genre}
                  required
                  id="filled-basic"
                  label="genre"
                  type="name"
                  variant="filled"
                  name="genre"
                  onChange={InputValue}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  defaultValue={singleData?.data?.year}
                  required
                  id="filled-basic"
                  label="year"
                  type="name"
                  variant="filled"
                  name="year"
                  onChange={InputValue}
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
};

export default EditBook;
