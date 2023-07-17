import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { usePostBookMutation } from '@/redux/Features/Products/ProductApi';
import toast, { Toaster } from 'react-hot-toast';

interface formType {
  title: string;
  author: string;
  genre: string;
  year: string;
}

export default function Checkout() {
  const [data, setData] = useState<formType>({
    title: '',
    author: '',
    genre: '',
    year: '',
  });

  const [postBook, { isSuccess, isLoading, isError }] = usePostBookMutation();

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
    try {
      const response = await postBook(data);

      if ('data' in response) {
        toast.success(response.data.message);
        console.log('inside condition');
      }
      console.log(response);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="mt-5">
      <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>
        Add New Book
      </Typography>
      <Card sx={{ padding: '10px 5px', maxWidth: 450, margin: ' 0 auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
