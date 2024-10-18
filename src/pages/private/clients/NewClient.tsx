import { Card, Label, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// firstName
// lastName
// email
// phone
// birthDate

function initialValues() {
    return {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthDate: '',
    };
}

function validationSchema() {
    return Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email(),
        phone: Yup.number(),
        birthDate: Yup.date(),
    });
}

function NewClient() {
    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema,
        onSubmit: (values) => {
            console.log({ values });
        },
        validateOnChange: true,
    });
    
    return (
        <Card className="max-w-full flex flex-col gap-4">
            <div className={'w-80'}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="firstName" value="First Name" />
                    </div>
                    <TextInput
                        id="firstName"
                        type="text"
                        sizing="md"
                        onChange={(value) => formik.setFieldValue('firstName', value.target.value)}
                        color={formik.errors.firstName ? 'failure' : 'gray'}
                        helperText={formik.errors.firstName &&
                            <> <span className="font-medium">Oops!</span> {formik.errors.firstName}</>
                        } />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="lastName" value="Last Name" />
                    </div>
                    <TextInput
                        id="lastName"
                        type="text"
                        sizing="md"
                        onChange={(value) => formik.setFieldValue('lastName', value.target.value)}
                        color={formik.errors.lastName ? 'failure' : 'gray'}
                        helperText={formik.errors.lastName &&
                            <> <span className="font-medium">Oops!</span> {formik.errors.lastName}</>
                        } />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                        id="email"
                        type="email"
                        sizing="md"
                        icon={HiMail}
                        onChange={(value) => formik.setFieldValue('email', value.target.value)}
                        color={formik.errors.email ? 'failure' : 'gray'}
                        helperText={formik.errors.email &&
                            <> <span className="font-medium">Oops!</span> {formik.errors.email}</>
                        } />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Phone" />
                    </div>
                    <TextInput
                        id="phone"
                        type="text"
                        sizing="md"
                        onChange={(value) => formik.setFieldValue('phone', value.target.value)}
                        color={formik.errors.phone ? 'failure' : 'gray'}
                        helperText={formik.errors.phone &&
                            <> <span className="font-medium">Oops!</span> {formik.errors.phone}</>
                        } />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="birthDate" value="Birth Date" />
                    </div>
                    <TextInput
                        id="birthDate" type="date"
                        sizing="md"
                        color={formik.errors.birthDate ? 'failure' : 'gray'}
                        helperText={formik.errors.birthDate &&
                            <> <span className="font-medium">Oops!</span> {formik.errors.birthDate}</>
                        } />
                </div>
            </div>
        </Card>
    );
}

export default NewClient;
