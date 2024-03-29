import * as yup from 'yup';
import { parse } from 'date-fns';
import { isValid } from 'date-fns';

export function initialPetValues(medicalHistoryData) {
  let medicalHistory = null;
  if(medicalHistoryData){
      const newDiagnostic = {
      ...medicalHistoryData?.diagnostic,
      surgicalIntervations: medicalHistoryData.diagnostic?.surgicalIntervations?.map(intervation => {
            return {
                ...intervation,
                intervationDate: parse(intervation.intervationDate, 'dd/MM/yyyy', new Date())
            }
        })
    }
    medicalHistory = {
        ...medicalHistoryData,
        diagnostic: newDiagnostic
    }
  }


  return {
    //medicalHistory?: {
    vacuna: medicalHistory?.isHaveAllVaccine || false,
    reproduccion: medicalHistory?.isReproduced || false,
    descendencia: medicalHistory?.descendants || '',
    habitaculo: medicalHistory?.room || '',
    enfermedad: medicalHistory?.diasesEvaluation || '',
    observacion: medicalHistory?.observation || '',
    //  food: {
    quantityFood: medicalHistory?.food?.quantity || '',
    typeFood: medicalHistory?.food?.type || '',
    //  },
    //  otherPet: {
    convivencia: medicalHistory?.otherPet?.isLiveOtherPets || false,
    whichPets: medicalHistory?.otherPet?.whichPets || '',
    //  },
    //  physicalExam: {
    weight: medicalHistory?.physicalExam?.weight || undefined,
    palpitaciones: medicalHistory?.physicalExam?.palpitations || '',
    temperatura: medicalHistory?.physicalExam?.temperature || undefined,
    frecuenciaRespiratoria: medicalHistory?.physicalExam?.respiratoryRate || undefined,
    frecuenciaCardiaca: medicalHistory?.physicalExam?.cardiacRate || undefined,
    examenLaboratorio: medicalHistory?.physicalExam?.laboratoryExam || '',
    pulso: medicalHistory?.physicalExam?.pulse || '',
    mucus: medicalHistory?.physicalExam?.mucous || '',
    //  },
    //  diagnostic: {
    diagnostic: medicalHistory?.diagnostic?.description || '',
    tratamientos: medicalHistory?.diagnostic?.treatments || [
      {
        'name' : '',
        quantity: '',
        frequency: '',
        days: undefined,
      }
    ],
    intervenciones: medicalHistory?.diagnostic?.surgicalIntervations || [],
    //  },
    //},
    uploadedFile: null,
  };
}

export function validationSchemaPetRegister(medicalHistory, activeStep) {
  // Anamnesis Schema
  if(activeStep === 0){
    return yup.object({
      quantityFood: yup
      .string()
      .required('La cantidad de alimento es obligatoria'),
      typeFood: yup.string().required('El tipo de alimento es obligatorio'),
      descendencia: yup.string().required('La descendencia es obligatoria'),
      reproduccion: yup.boolean(),
      //.required('El campo de verificación de reproducción es obligatorio'),
      vacuna: yup.boolean(),
      //.required('El campo de verificación de vacunas es obligatorio'),
      convivencia: yup.boolean(),
      //.required('El campo de convivencia con otras mascotas es obligatorio'),
      whichPets: yup.string().when('convivencia', {
        is: true,
        then: () =>
          yup
            .string()
            .required(
              'Se verificó que convive con otras mascotas, por lo tanto este campo ahora es requerido'
            ),
        otherwise: () => yup.string(),
      }),
      enfermedad: yup
        .string()
        .required('Los detalles de la enfermedad o falta de ella son requeridos'),
      observacion: yup.string().required('Las observaciones son obligatorias'),
      habitaculo: yup.string().required('El habitáculo es obligatorio'),
    });
  } else if ( activeStep === 1){
    return yup.object({
      weight: yup
      .number()
      .positive('El peso debe ser positivo para que sea válido')
      .required('El peso de la mascota es obligatorio'),
      palpitaciones: yup
      .string()
      .required('Las palpitaciones obligatorio'),
      temperatura: yup
      .number()
      .positive('La temperatura debe ser positivo para que sea válido'),
      frecuenciaCardiaca: yup
      .number()
      .positive('La frecuencia cardiaca debe ser positivo para que sea válido'),
      frecuenciaRespiratoria: yup
      .number()
      .positive('La frecuencia respiratoria debe ser positivo para que sea válido'),
      examenLaboratorio: yup
      .string(),
      pulso: yup
      .string(),
      mucus: yup
      .string(),
    });
  } else if (activeStep === 2){
    let mergedSchema = null;
    const schemaBase = yup.object({
      diagnostic: yup
      .string()
      .required('El diagnostico obligatorio'),
      tratamientos:  yup.array().of(yup.object().shape({
        name: yup
        .string()
        .required('El nombre del tratamiento es obligatorio'),
        quantity: yup
        .string()
        .required('La cantidad de tratamiento es obligatoria'),
        frequency: yup
        .string()
        .required('La frecuencia de aplicación del tratamiento obligatorio'),
        days: yup
          .number()
          .positive('Los dias de aplicacion deben ser positivo para que sea válido')
          .required('Los dias de aplicacion del tratamiento es obligatorio'),
      }))
      .min(1, 'Se requiere que ingrese al menos un tratamiento'),
      intervenciones:  yup.array().of(yup.object().shape({
        name: yup
        .string()
        .required('El nombre de la intervención es obligatorio'),
        description: yup
        .string()
        .required('La descripcion de la intervención es obligatoria'),
        intervationDate: yup
          .date()
          .min(new Date(), 'La fecha no puede ser anterior al día de hoy')
          .transform((value, originalValue) => {
            if (originalValue) {
              const date = new Date(originalValue);
              return isValid(date) ? date : new Date('invalid');
            }
            return null;
          })
          .required('La fecha es requerida')
          .typeError('Ingrese una fecha válida'),
          })),
    });
    
    return schemaBase;
  }
}

export function initialTreatmentsValues() {
  return {
    nameTreatment: '',
    quantityTreatment: '',
    frequencyTreatment: '',
    days: '',
  }
}
export function medicalHistoryTreatmentsSchema(){
  return yup.object({
    name: yup
    .string()
    .required('El nombre del tratamiento es obligatorio'),
    quantityTreatment: yup
    .string()
    .required('La cantidad de tratamiento es obligatoria'),
    frequencyTreatment: yup
    .string()
    .required('La frecuencia de aplicación del tratamiento obligatorio'),
    days: yup
      .number()
      .positive('Los dias de aplicacion deben ser positivo para que sea válido')
      .required('Los dias de aplicacion del tratamiento es obligatorio'),
    });
}

export function initialIntervationsValues() {
  return {
    name: '',
    description: '',
    date: null,
  }
}
export function medicalHistoryIntervationsSchema(){
  return yup.object({
    name: yup
    .string()
    .required('El nombre de la intervención es obligatorio'),
    description: yup
    .string()
    .required('La descripcion de la intervención es obligatoria'),
    intervationDate: yup
      .date()
      .min(new Date(), 'La fecha no puede ser anterior al día de hoy')
      .transform((value, originalValue) => {
        if (originalValue) {
          const date = new Date(originalValue);
          return isValid(date) ? date : new Date('invalid');
        }
        return null;
      })
      .required('La fecha es requerida')
      .typeError('Ingrese una fecha válida'),
    });
}