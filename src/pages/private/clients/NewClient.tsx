import { Button, Card, Label, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Container } from '@/assets/styles/pages/private/container.styles.ts';
import { AiOutlineLoading } from 'react-icons/ai';
import { useCreateClientMutation } from '@/features/client/clientApi.ts';
import { IClient } from '@/features/client/clientTypes.ts';
import { useNavigate } from 'react-router-dom';

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
    
    const [createClient, response] = useCreateClientMutation();
    
    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema,
        onSubmit: async (values) => {
            const client: Partial<IClient> = values;
            await createClient(client).unwrap().then(() => {
                navigate('..', { relative: 'path' });
            });
        },
        validateOnChange: true,
    });
    
    const goBack = () => {
        navigate('..', { relative: 'path' });
    };
    
    return (
        <Container>
            <Card className="w-96">
                <div className={''}>
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
                            onChange={(value) => formik.setFieldValue('birthDate', value.target.value)}
                            helperText={formik.errors.birthDate &&
                                <> <span className="font-medium">Oops!</span> {formik.errors.birthDate}</>
                            } />
                    </div>
                </div>
                <Button
                    size="md"
                    isProcessing={response.isLoading}
                    onClick={formik.submitForm}
                    processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}>
                    Save
                </Button>
                <Button color={'gray'} onClick={goBack}>Go back</Button>
                {response.error && <pre>{JSON.stringify(response.error, null, 2)}</pre>}
            </Card>
        </Container>
    );
}

export default NewClient;
