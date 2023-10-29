import {useEffect, useState} from "react";
import {Button, Card, CardContent, FormHelperText, Grid, TextField, Typography} from "@mui/material";
import {DeleteButton} from "../../../../shared/components/DeleteButton.jsx";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

export function DewormingFields({ formik }) {
    const [deworming, setDeworming] = useState([])

    const handleDateVaccinesChange = (date, index, type) => {
        formik.setFieldValue(`deworming[${index}].${type}`, date);
    }

    const addDeworming = () => {
        const newDeworming = [
            ...formik.values.deworming,
            {
                dayAplicationInitDeworming: null,
                dayAplicationFinalDeworming: null,
                dewormingName: '',
                dose: ''
            }
        ];
        setDeworming(newDeworming);
        formik.setFieldValue('deworming', newDeworming);
    };

    const removeDeworming = (index) => {
        const newDeworming = formik.values.deworming.filter((_, i) => i !== index)
        const newErrorsDeworming = formik.errors.deworming.filter((_, i) => i !== index)
        formik.setFieldError('deworming', newErrorsDeworming);
        formik.setFieldValue('deworming', newDeworming);
        setDeworming(newDeworming);
    }

    useEffect(() => {
        const x =(formik.touched.deworming &&
            formik.touched.deworming[0] &&
            formik.touched.deworming[0]?.dayAplicationFinalDeworming &&
            formik.errors.deworming &&
            formik.errors.deworming[0] &&
            Boolean(formik.errors.deworming[0]?.dayAplicationFinalDeworming))
        console.log({x})
    }, [formik])

    useEffect(() => {
        setDeworming(formik.initialValues.deworming)
    },[])

    return (
        <Card className="deworming-fields">
            {deworming && deworming.map((deworming, index) => {
                return (
                    <Card variant="outlined" sx={{ml: 1.5, mr: 1.5, mt:1 }} key={index}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Grid container spacing={1} justifyContent="space-between" sx={{ mb:2, mt:1 }}>
                                <Typography variant="h6" gutterBottom sx={{ ml:3 }}>
                                    Desparasitante {index + 1}
                                </Typography>
                                <DeleteButton action={() => removeDeworming(index)} />
                            </Grid>
                            <Grid container rowSpacing={1} spacing={1}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        name={`deworming[${index}].dewormingName`}
                                        label='Nombre del desparasitante'
                                        variant='outlined'
                                        size='small'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.deworming[index]?.dewormingName || ''}
                                        error={
                                            (formik.touched.deworming &&
                                                formik.touched.deworming[index] &&
                                                formik.touched.deworming[index]?.dewormingName &&
                                                formik.errors.deworming &&
                                                formik.errors.deworming[index] &&
                                                Boolean(formik.errors.deworming[index]?.dewormingName)) ?? false
                                        }
                                        helperText={
                                            formik.touched.deworming &&
                                            formik.touched.deworming[index] &&
                                            formik.errors.deworming &&
                                            formik.errors.deworming[index] &&
                                            formik.errors.deworming[index]?.dewormingName
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                        fullWidth
                                        name={`deworming[${index}].dose`}
                                        label='Dosis aplicada'
                                        variant='outlined'
                                        size='small'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.deworming[index]?.dose || ''}
                                        error={
                                            (formik.touched.deworming &&
                                                formik.touched.deworming[index] &&
                                                formik.touched.deworming[index]?.dose &&
                                                formik.errors.deworming &&
                                                formik.errors.deworming[index] &&
                                                Boolean(formik.errors.deworming[index]?.dose)) ?? false
                                        }
                                        helperText={
                                            formik.touched.deworming &&
                                            formik.touched.deworming[index] &&
                                            formik.errors.deworming &&
                                            formik.errors.deworming[index] &&
                                            formik.errors.deworming[index]?.dose
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label='Día aplicación'
                                            name={`deworming[${index}].dayAplicationInit`}
                                            value={formik.values.deworming[index].dayAplicationInitDeworming}
                                            onBlur={formik.handleBlur}
                                            onChange={(date)=>handleDateVaccinesChange(date, index, 'dayAplicationInitDeworming')}
                                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={
                                                        (formik.touched.deworming &&
                                                            formik.touched.deworming[index] &&
                                                            formik.touched.deworming[index]?.dayAplicationInitDeworming &&
                                                            formik.errors.deworming &&
                                                            formik.errors.deworming[index] &&
                                                            Boolean(formik.errors.deworming[index]?.dayAplicationInitDeworming)) ?? false}
                                                />
                                            )}
                                            showTodayButton
                                            format='dd/MM/yyyy'
                                        />
                                        {(formik.touched.deworming &&
                                                formik.touched.deworming[index] &&
                                                formik.touched.deworming[index].dayAplicationInitDeworming) &&
                                            formik.errors.deworming &&
                                            formik.errors.deworming[index] &&
                                            formik.errors.deworming[index].dayAplicationInitDeworming &&
                                            (
                                                <FormHelperText error>{formik.errors.deworming[index].dayAplicationInitDeworming}</FormHelperText>
                                            )}
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label='Día de proximo refuerzo'
                                            name={`deworming[${index}].dayAplicationFinalDeworming`}
                                            value={formik.values.deworming[index].dayAplicationFinalDeworming}
                                            onBlur={formik.handleBlur}
                                            onChange={(date)=>handleDateVaccinesChange(date, index, 'dayAplicationFinalDeworming')}
                                            slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    error={
                                                        (formik.touched.deworming &&
                                                            formik.touched.deworming[index] &&
                                                            formik.touched.deworming[index]?.dayAplicationFinalDeworming &&
                                                            formik.errors.deworming &&
                                                            formik.errors.deworming[index] &&
                                                            Boolean(formik.errors.deworming[index]?.dayAplicationFinalDeworming)) ?? false}
                                                />
                                            )}
                                            showTodayButton
                                            format='dd/MM/yyyy'
                                        />
                                        {(formik.touched.deworming &&
                                                formik.touched.deworming[index] &&
                                                formik.touched.deworming[index].dayAplicationFinalDeworming) &&
                                            formik.errors.deworming &&
                                            formik.errors.deworming[index] &&
                                            formik.errors.deworming[index].dayAplicationFinalDeworming &&
                                            (
                                                <FormHelperText error>{formik.errors.deworming[index].dayAplicationFinalDeworming}</FormHelperText>
                                            )}
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )
            })}
            <Grid item xs={4} sm={8} md={12} sx={{textAlign:"center", mt:1, mb:1}}>
                <Button
                    type="button"
                    onClick={addDeworming}
                >
                    Añadir desparasitante
                </Button>
            </Grid>
    </Card>)
}