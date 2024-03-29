import * as yup from 'yup';
import { format, parse } from 'date-fns';
import { isValid } from 'date-fns';

export function initialPetValues(pet) {
  let dateObject;
  if (pet) {
    dateObject = parse(pet.birthday, 'dd/MM/yyyy', new Date());
  }
  return {
    name: pet?.name || '',
    specie: pet?.specie || null,
    raza: pet?.raza || '',
    color: pet?.color || '',
    isHaveTattoo: pet?.isHaveTatto || false,
    birthday: pet ? dateObject : null,
    gender: pet?.gender || '',
    pedigree: pet?.pedigree || false,
  };
}

export function validationSchemaPetRegister(pet) {
  return yup.object({
    name: yup.string().required('El nombre es obligatorio'),
    specie: yup
      .object()
      .required('El campo de especie solo acepta las especies listadas'),
    raza: yup.string().required('La raza es obligatoria'),
    color: yup.string().required('El color de pelaje es obligatorio'),
    isHaveTattoo: yup.boolean(),
    //.required('El campo para verificar existencia de tatuaje es obligatorio'),
    birthday: yup
      .date()
      .max(new Date(), 'La fecha no puede ser posterior al día de hoy')
      .transform((value, originalValue) => {
        if (originalValue) {
          const date = new Date(originalValue);
          return isValid(date) ? date : new Date('invalid');
        }
        return null;
      })
      .required('La fecha es requerida')
      .typeError('Ingrese una fecha válida'),
    gender: yup
      .string()
      .oneOf(
        ['macho', 'hembra'],
        'El campo de género solo acepta macho o hembra'
      )
      .required('El campo de género solo acepta macho o hembra'),
    pedigree: yup
      .boolean()
      .required('El campo para verificar pedigree es obligatorio'),
  });
}
