import React,{useState} from 'react';
import './createperson.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Form, Field } from 'react-final-form'
import { TextField, Select  } from "final-form-material-ui";
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';

function checkNumber(AStr) {
  AStr = AStr.replace(/[\s\-]/g, '');
  return AStr.match(/^((\+?3)?8)?((0\(\d{2}\)?)|(\(0\d{2}\))|(0\d{2}))\d{7}$/) != null;
}

function CreatePerson() {
  const [middleNameStatus, setMiddleNameStatus] = useState(false)
  const [RNOCPPstatus, setRNOCPPstatus] = useState(false)
  const [errorPhone, setErrorPhone] = useState(false)
  const [errorRecord, setErrorRecord] = useState(false)
  const [warning, setWarning] = useState(['Немає по батькові згідно документів', 'Немає ІПН за віком чи має відмітку у паспорті'])
    
    const onSubmit = async values => {
        window.alert(JSON.stringify(values, 0, 2))
      }

      const handleChange = (type) => {
        switch (type) {
          case "middleName_switch":
            if(middleNameStatus === true){
              setMiddleNameStatus(false)
            }else{
              setMiddleNameStatus(true)
            }
            break;
          case "RNOCPP_switch":
            if(RNOCPPstatus === true){
              setRNOCPPstatus(false)
            }else{
              setRNOCPPstatus(true)
            }
            break;
        
          default:
            break;
        }
      }

  return (
   <div className='container'>
        <div className='wrapper'>
            <div>
                <ArrowBackIcon style={{ color: 'white' }}/>
            </div>
            <div className='titleName'>
                Створення персони
            </div>  
        </div>
        <div className='wrapperForm'>
            <div className='titleForm'>
                Дані пацієнта
            </div>
            <Form
              onSubmit={onSubmit}
              initialValues={{}}
              validate={values => {
              if(values.phone !== undefined){
                setErrorPhone(!checkNumber(values.phone))
              }
              if(values.record !== undefined){
              if(!isNaN(values.record) && values.record.length === 9){
                setErrorRecord(false)
              }else{
                setErrorRecord(true )
              }
              }
            }}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                <div className='container_form'>
                      <Field
                        required
                        name="surname"
                        variant="standard"
                        component={TextField}
                        InputProps={{className:"inputStyle", }}
                        // InputLabelProps={{className:"textfiel"}}
                        type="text"
                        label="Призвіще"
                      />
                      <Field
                        required
                        name="name"
                        variant="standard"
                        component={TextField}
                        InputProps={{className:"inputStyle"}}
                        type="text"
                        label="Ім'я"
                      />
                      <div className='switch_position_relative'>
                      <Field
                        required
                        name="middleName"
                        variant="standard"
                        disabled={middleNameStatus}
                        component={TextField}
                        InputProps={{className:"inputStyle"}}
                        type="text"
                        label="По батькові"
                      />
                        <div className='switch_position_absolute'>
                            <Switch
                                checked={middleNameStatus}
                                onChange={() => handleChange("middleName_switch")}
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </div>
                        {middleNameStatus && <div className='position_warning'>{warning[0]}</div>}
                      </div>
                      <div className='switch_position_relative'>
                      <Field
                        required
                        name="RNOCPP"
                        variant="standard"
                        component={TextField}
                        disabled={RNOCPPstatus}
                        InputProps={{className:"inputStyle"}}
                        type="text"
                        label="РНОКПП(ІПН)"
                      />
                      <div className='switch_position_absolute'>
                        <Switch
                            checked={RNOCPPstatus}
                            onChange={() => handleChange("RNOCPP_switch")}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        </div>
                        {RNOCPPstatus && <div className='position_warning'>{warning[1]}</div>}
                      </div>
                      <Field
                        required
                        name="birthday"
                        variant="standard"
                        component={TextField}
                        InputProps={{className:"inputStyle"}}
                        type="date"
                        label="Дата народження"
                        defaultValue=''
                      />
                        <Field className="inputStyle" label="Стать*" required variant="standard" name="sex" component={Select}>
                                <MenuItem selected><em>--Вибрати--</em></MenuItem>
                                <MenuItem value={"man"}>Чоловік</MenuItem>
                                <MenuItem value={"woman"}>Жінка</MenuItem>
                        </Field>
                    <div className='container_form'>
                        <Field
                          required
                          name="country_of_birth"
                          variant="standard"
                          component={TextField}
                          InputProps={{className:"inputStyleWidth"}}
                          type="text"
                          label="Країна народження"
                      />
                        <Field
                          required
                          name="place_of_birth"
                          variant="standard"
                          component={TextField}
                          InputProps={{className:"inputStyleWidth"}}
                          type="text"
                          label="Місце народження"
                      />
                        <Field formControlProps={{className: 'inputStyleWidth'}} label="Бажаний спосіб св'язку із пацієнтом" variant="standard" name="communication" component={Select}>
                                <MenuItem selected><em>--Вибрати--</em></MenuItem>
                                <MenuItem value={"email"}>Електронною поштою</MenuItem>
                                <MenuItem value={"phone"}>Телефоном</MenuItem>
                        </Field>
                        <Field
                          name="secret_word"
                          variant="standard"
                          component={TextField}
                          InputProps={{className:"inputStyleWidth"}}
                          type="text"
                          error={true}
                          helperText="Incorrect entry."
                          label="Секретное слово (не менше 6 символів)"
                      />
                      <div style={{display:"flex", flexDirection:"column", position:"relative", }}>
                      <Field
                          name="phone"
                          required
                          variant="standard"
                          component={TextField}
                          InputProps={{className:"inputStyleWidth",error:errorPhone}}
                          type="text"
                          placeholder="+38(___) ___ __ __"
                          label="Контакний номер телефона"
                        
                      />
                        {errorPhone && (<div style={{display:"flex", flexDirection:"column", alignItems:'flex-end', position:'absolute', right:0, bottom:3}}>
                              <ErrorOutlineIcon style={{color:"red" }}/>
                              <div style={{color:"red" }}>Некоректний номер телефона. Приклад: +38(093)999-88-77</div>
                        </div>)}
                      </div>                 
                        <Field
                          name="email"
                          variant="standard"
                          component={TextField}
                          InputProps={{className:"inputStyleWidth"}}
                          type="text"
                          label="Адреса електроннії пошти"
                          placeholder="example@example.com"
                      />
                      </div>
                </div>
                    <div>
                          <div className='titleForm'>
                              Документ, що посвідчує особу
                          </div>  
                    <div className='container_form'>
                          <Field  formControlProps={{className: 'inputStyleWidth'}} label='Тип документа' variant="standard" name="passport" component={Select}>
                                <MenuItem selected><em>--Вибрати--</em></MenuItem>
                                <MenuItem value={'Посвідчення особы, яка потребуэ додаткового захисту'}>Посвідчення особы, яка потребуэ додаткового захисту</MenuItem>
                                <MenuItem value={'Паспорт (ID-Картка)'}>Паспорт (ID-Картка)</MenuItem>
                                <MenuItem value={'Паспорт (ID-Книжечка)'}>Паспорт (ID-Книжечка)</MenuItem>
                                <MenuItem value={'Посвідка на постійне проживання в Україні'}>Посвідка на постійне проживання в Україні</MenuItem>
                                <MenuItem value={'Посвідка біженця'}>Посвідка біженця</MenuItem>
                                <MenuItem value={'Посвідка на проживання'}>Посвідка на проживання</MenuItem>
                                <MenuItem value={'Тимчасове посвідчення громадянина Україні'}>Тимчасове посвідчення громадянина Україні</MenuItem>
                        </Field>
                        <Field
                          name="passport_series"
                          variant="standard"
                          component={TextField}
                          InputProps={{className:"inputStyleWidth"}}
                          type="text"
                          helperText="Incorrect entry."
                          label="Серія (за наявності), номер"
                      />
                        <Field
                        required
                        name="when_get"
                        variant="standard"
                        component={TextField}
                        InputProps={{className:"inputStyleWidth"}}
                        type="date"
                        label="Коли видано"
                        defaultValue=''
                      />
                        <Field
                        // required
                        name="time_passport"
                        variant="standard"
                        component={TextField}
                        InputProps={{className:"inputStyleWidth"}}
                        type="date"
                        label="Діє до"
                        defaultValue=''
                      />
                      <Field
                          name="where_get"
                          variant="standard"
                          component={TextField}
                          InputProps={{className:"inputStyleWidth"}}
                          type="text"
                          helperText="Incorrect entry."
                          label="Ким видано"
                      />
                      <div style={{display:"flex", flexDirection:"column", position:"relative", }}>
                          <Field
                              name="record"
                              variant="standard"
                              component={TextField}
                              InputProps={{className:"inputStyleWidth", error:errorRecord}}
                              type="text"
                              label="Запис №(УНЗР)"
                          />
                            {errorRecord &&  (<div style={{display:"flex", flexDirection:"column", alignItems:'flex-end', position:'absolute', right:0, bottom:3}}>
                                  <ErrorOutlineIcon style={{color:"red" }}/>
                                  <div style={{color:"red" }}>Номер введено некоретно, поле повинно містити 9 цифр</div>
                        </div>)}
                      </div>
                          <Button type="submit" variant="contained">SEND</Button>
                    </div>
                    </div>
                      <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
                )}
            />
        </div>
    </div>
  );
}

export default CreatePerson;