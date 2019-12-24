import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { FormControl, InputField, Button, ButtonStrip, AlertBar} from '@dhis2/ui-core'
import UpdateData from './UpdateData'

const query = {
    me: {
        resource: 'me',
    },
}

function AppContent() {
    const { loading, error, data } = useDataQuery( query)

    const [firstName, setFirstName] = useState(null)
    const [surname, setSurname] = useState(null)
    const [whatsApp, setWhatsApp] = useState(null)
    const [language, setLanguage] = useState(null)
    const [modal, setModal] = useState(false)
    const [disabled, setDisable] = useState(true)
    const [success, setSuccess] = useState(false)

    if ( loading ) {
        return <div>Loading...</div>
    }

    if ( error ) {
        return <div>An error occured!</div>
    }
        
    return <div style={{minWidth: '366px'}}>
    <FormControl>
        <InputField
            disabled = {disabled}
            label="First Name"
            name="firstName"
            onBlur={function onBlur(){}}
            onChange={e => setFirstName(e.target.value)}
            onFocus={function onFocus(){}}
            type="text"
            value = {(firstName === null) ? data.me.firstName : firstName}
        />

        <InputField
            disabled = {disabled}
            label="Surname"
            name="surname"
            onBlur={function onBlur(){}}
            onChange={e => setSurname(e.target.value)}
            onFocus={function onFocus(){}}
            type="text"
            value = {(surname === null) ? data.me.surname : surname}
        />

        <InputField
            disabled = {disabled}
            label="WhatsApp"
            name="whatsApp"
            onBlur={function onBlur(){}}
            onChange={e => setWhatsApp(e.target.value)}
            onFocus={function onFocus(){}}
            type="text"
            value = {(whatsApp === null) ? data.me.whatsApp : whatsApp}
        />

        <InputField
            disabled = {disabled}
            label="Language"
            name="language"
            onBlur={function onBlur(){}}
            onChange={e => setLanguage(e.target.value)}
            onFocus={function onFocus(){}}
            type="text"
            value = {(language === null) ? data.me.languages : language}
        />
        <div style={{marginTop: 8}}>
        <ButtonStrip >
            <Button
                disabled = {disabled}
                name="update"
                onClick={() => setModal(!modal)}
                primary
                type="button"
                value="default"
            >
                Update
            </Button>
            <Button
                disabled = {!disabled}
                name="edit"
                onClick={() => setDisable(!disabled)}
                primary
                type="button"
                value="default"
            >
                Edit
            </Button>
        </ButtonStrip>
        </div>

        

    </FormControl>

    {modal && <UpdateData firstName={firstName}
                        surname={surname}
                        whatsApp={whatsApp}
                        language={language}
                        onChange={setModal}
                        onDisable={setDisable}
                        onSubmit={setSuccess}
                        >
                </UpdateData>
    }

    {(!modal && success) &&  <AlertBar
      duration={8000}
      icon
      permanent
      success
    >
        "Successfully updated!"
    </AlertBar>}
    </div>
}

export default AppContent





