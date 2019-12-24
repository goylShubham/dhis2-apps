import React, { useState, useEffect } from 'react'
import { useDataMutation } from '@dhis2/app-runtime'
import { Modal, ButtonStrip, Button } from '@dhis2/ui-core'
import { AlertBar } from '@dhis2/ui-core/build/cjs/AlertBar'


const mutation = {
    resource: 'me',
    type: 'update',
    data: ({ firstName, surname, whatsApp, languages }) => ({
        firstName, surname, whatsApp, languages
    }),
}

function UpdateData({ firstName, surname, whatsApp, language, onChange, onDisable, onSubmit }) {
    const [mutate, {loading, error, data}] = useDataMutation(mutation)

    const [modal, setModal] = useState(true)
    const [disabled, setDisable] = useState(true)
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        onChange(modal)
        onDisable(disabled)
        onSubmit(success)
    }, [onChange, modal, onDisable, disabled, onSubmit, success])


    const doMutation = async () => {
        await mutate({
            firstName: firstName,
            surname: surname,
            whatsApp: whatsApp,
            languages: language
        })
        setSuccess(true)
        setModal(false)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <AlertBar duration={8000}
        icon
        permanent
        critical
      >
          "An error has occured!"</AlertBar>
    }

    return <div>
        <Modal open small>
        <Modal.Content>Do you want to continue with the changes ?</Modal.Content>
        <Modal.Actions>
            <ButtonStrip end>
                <Button
                    name="update"
                    onClick={() => [setModal(!modal), setDisable(disabled)]}
                    type="button"
                    value="default"
                >
                    No
                </Button>
                <Button
                    name="cancel"
                    onClick={() => doMutation()}
                    primary
                    type="button"
                    value="default"
                >
                    Yes
                </Button>
            </ButtonStrip>
        </Modal.Actions>    
    </Modal>
    </div>
}

export default UpdateData