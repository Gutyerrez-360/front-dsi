import { Button, Card, CardContent, CircularProgress, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DeleteOutline } from "@mui/icons-material";
import { UserApi } from "../../../../api/User.api"
import { useAuth } from '../../../../hooks';
import Autocomplete from "@mui/material/Autocomplete";
import { Product } from "../../../../api/Product.api.jsx";


const userController = new UserApi()
const productController = new Product()
 export  const FactureFormFields = ({ formik }) => {
    const [billsDetails, setBillsDetails] = useState([])
    const [allUsers, setAllUsers] = useState([]);
    const [allProducts, setAllProducts] = useState([])
    const lastBillsDetailsCardRef = useRef(null);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const { accessToken } = useAuth();
    const addBillsDetails = () => {
        const newBillsDetails = [...formik.values.billsDetails, { quantity: null, productId: null }];
        setBillsDetails(newBillsDetails);
        formik.setFieldValue('billsDetails', newBillsDetails);

        if (lastBillsDetailsCardRef.current) {
            lastBillsDetailsCardRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const removeBillsDetails= (index) => {
        const newBillsDetails = formik.values.billsDetails.filter((_, i) => i !== index)
        formik.setFieldValue('billsDetails', newBillsDetails);
        setBillsDetails(newBillsDetails);

        if(formik.errors.billsDetails && typeof(formik.errors.billsDetails) !== 'string' && formik.errors.billsDetails.length > 0){
            const newErrorsBillsDetails = formik.errors.billsDetails.filter((_, i) => i !== index)
            formik.setFieldError('billsDetails', newErrorsBillsDetails);
        }

        if(formik.touched.billsDetails && formik.touched.billsDetails.length > 0){
            const newTouchedBillsDetails = formik.touched.billsDetails.filter((_, i) => i !== index)
            formik.setFieldTouched('billsDetails', newTouchedBillsDetails);
        }
    }

     const getAllUsers = useCallback(
         async () => {
             setIsLoadingUsers(true)
             let page = 1;
             let allData = [];

             while (true) {
                 const { data } = await userController.getAllUsers(accessToken,page, null, 25);

                 if (data.length <= 0) {
                     break;
                 }

                 if (data) {
                     allData = allData.concat(data);
                 }

                 page++
             }

             setAllUsers(allData);
             setIsLoadingUsers(false)
         }, []
     );

     const getAllProducts = useCallback(
         async () => {
            setIsLoadingProducts(true)
             let page = 1;
             let allData = [];

             while (true) {
                 const { data } = await productController.getAllProducts(accessToken,page, null, 25);

                 if (data.length <= 0) {
                     break;
                 }

                 if (data) {
                     allData = allData.concat(data);
                 }

                 page++
             }

             setAllProducts(allData);
             setIsLoadingProducts(false)
         }, []
     );

    useEffect( () => {
        setBillsDetails(formik.initialValues.billsDetails)
        getAllUsers().catch(console.error);
        getAllProducts().catch(console.error);
    },[getAllUsers, getAllProducts])


    return (
        <Grid container spacing={1} justifyContent="space-between" textAlign="center" columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={4} sm={8} md={12}>
                <Autocomplete
                    name='cliendId'
                    label='Selecciona al cliente'
                    variant='outlined'
                    size='small'
                    onBlur={formik.handleBlur}
                    options={allUsers.map((client) => ({label: `${client.email}`, value: client.id, firstName: client.firstName, lastName: client.lastName  }))}
                    isOptionEqualToValue={(options, value) => (options.value === value.value)}
                    onChange={(_,value)=> {
                        formik.setFieldValue('clientId', value ?? null)
                        formik.setFieldValue('firstName', value?.firstName ?? '')
                        formik.setFieldValue('lastName', value?.lastName ?? '')
                    }}
                    getOptionLabel={(option) => option.label}
                    value={formik.values.clientId}
                    loading={isLoadingUsers}
                    renderInput={(params)=>
                        <TextField
                            {...params}
                            name='cliendId'
                            label='Selecciona al cliente'
                            error={formik.touched.clientId && Boolean(formik.errors.clientId)}
                            helperText={formik.touched.clientId && formik.errors.clientId}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {isLoadingUsers ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />}
                />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
            <TextField
                fullWidth
                disabled
                name='firstName'
                label='Nombres'
                variant='outlined'
                size='small'
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                fullWidth
                disabled
                name='lastName'
                label='Apellidos'
                variant='outlined'
                size='small'
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
            />
        </Grid>

        <Grid item xs={4} sm={12} md={12}>
            {(formik.touched.billsDetails &&
                    formik.values.billsDetails.length === 0 &&
                    Boolean(formik.errors.billsDetails) &&
                    (typeof(formik.errors.billsDetails) === 'string')) &&
                <FormHelperText error={true}>{formik.errors.billsDetails}</FormHelperText>
            }
            <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {billsDetails && billsDetails.map((billsDetails, index) => {
                    return <Grid
                        container
                        spacing={1}
                        justifyContent="space-between"
                        textAlign="center"
                        key={index}
                        sx={{ mt:0.5}}
                    >
                        <Card variant="outlined" sx={{ width: "95%", maxWidth: '95%', mt:0.5, ml: 1.5 }}>
                            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Grid container spacing={1} justifyContent="space-between" alignItems="center" sx={{ mb:1 }}>
                                    <Typography variant="h6" gutterBottom sx={{ ml:5 }}>
                                        Item {index + 1}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        type="button"
                                        onClick={() => removeBillsDetails(index)}
                                    >
                                        <DeleteOutline color="action" />
                                    </Button>
                                </Grid>
                                <Grid container rowSpacing={1} spacing={1}>
                                    <Grid item xs={12} sm={12} md={9}>
                                        <Autocomplete
                                            label='Selecciona al cliente'
                                            variant='outlined'
                                            size='small'
                                            name={`billsDetails[${index}].quantity`}
                                            onBlur={formik.handleBlur}
                                            options={allProducts.map((product) =>
                                                ({label: `${product.nameProduct} - $${product.sellingProduct}`, value: product.id}))}
                                            isOptionEqualToValue={(options, value) => (options.value === value.value)}
                                            onChange={(_,value)=> {
                                                formik.setFieldValue(`billsDetails[${index}].productId`, value ?? null)
                                            }}
                                            loading={isLoadingProducts}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params)=>
                                                <TextField
                                                    {...params}
                                                    name={`billsDetails[${index}].quantity`}
                                                    label='Selecciona el producto'
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {isLoadingProducts ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                    error={(formik.touched.billsDetails &&
                                                        formik.touched.billsDetails[index] &&
                                                        formik.touched.billsDetails[index]?.productId &&
                                                        formik.errors.billsDetails &&
                                                        formik.errors.billsDetails[index] &&
                                                        Boolean(formik.errors.billsDetails[index]?.productId)) ?? false}
                                                    helperText={formik.touched.billsDetails &&
                                                        formik.touched.billsDetails[index] &&
                                                        formik.touched.billsDetails[index]?.productId &&
                                                        formik.errors.billsDetails &&
                                                        formik.errors.billsDetails[index] &&
                                                        formik.errors.billsDetails[index]?.productId
                                                    }
                                                />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={3}>
                                        <TextField
                                            fullWidth
                                            type='number'
                                            name={`billsDetails[${index}].quantity`}
                                            label='Cantidad'
                                            variant='outlined'
                                            size='small'
                                            sx={{ mb: 1.5 }}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.billsDetails[index]?.quantity || ''}
                                            error={
                                                (formik.touched.billsDetails &&
                                                    formik.touched.billsDetails[index] &&
                                                    formik.touched.billsDetails[index]?.quantity &&
                                                    formik.errors.billsDetails &&
                                                    formik.errors.billsDetails[index] &&
                                                    Boolean(formik.errors.billsDetails[index]?.quantity)) ?? false
                                            }
                                            helperText={
                                                formik.touched.billsDetails &&
                                                formik.touched.billsDetails[index] &&
                                                formik.touched.billsDetails[index]?.quantity &&
                                                formik.errors.billsDetails &&
                                                formik.errors.billsDetails[index] &&
                                                formik.errors.billsDetails[index]?.quantity
                                            }
                                            ref={index === billsDetails.length - 1 ? lastBillsDetailsCardRef : null}
                                        />
                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>
                    </Grid>
                    }
                )}
            </div>
        </Grid>
        <Grid item xs={4} sm={8} md={12}>
            <Button
                type="button"
                onClick={addBillsDetails}
            >
                Añadir Producto
            </Button>
        </Grid>
    </Grid>
    )
}

