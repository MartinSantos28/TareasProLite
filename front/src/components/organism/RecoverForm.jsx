import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecoverForm = () => {
    const navigate = new useNavigate();
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNext = () => {
        setStep(step + 1);
    }

    const handlePrevious = () => {
        setStep(step - 1);
    }

    const handleCancel = () => {
        navigate('/')
    }

    return (
        <div className='box-formrecover'>
            {step === 1 && (
                <form key={step}>
                    <h2>Recuperación de Contraseña</h2>
                    <span>Ingresa el correo electrónico con el que te registraste</span>
                    <div  className='wrapper-inputs_recover'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Correo electrónico" />
                    </div>
                    <div className="buttons">
                        <button className='btn-cancel' type="button" onClick={handleCancel}>Cancelar</button>
                        <button className='btn-next' type="button" onClick={handleNext}>Siguiente</button>
                    </div>
                </form>
            )}
            {step === 2 && (
                <form key={step}>
                    <h2>Recuperación de Contraseña</h2>
                    <span>Ingresa el código de verificación enviado a tu correo</span>
                    <div className='wrapper-inputs_recover'>
                        <label htmlFor="verificationCode">Código de verificación</label>
                        <input type="text" placeholder="Código de verificación" />
                    </div>
                    <div className="buttons">
                        <button className='btn-cancel' type="button" onClick={handlePrevious}>Regresar</button>
                        <button className='btn-next' type="button" onClick={handleNext}>Siguiente</button>
                    </div>
                </form>
            )}
            {step === 3 && (
                <form key={step}>
                    <h2>Cambio de Contraseña</h2>
                    <span>Ingresa tu nueva contraseña</span>
                    <div className='wrapper-inputs_recover'>
                        <label htmlFor="password">Nueva Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nueva contraseña"
                        />
                    </div>
                    <div className='wrapper-inputs_recover'>
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirmar contraseña"
                        />
                    </div>
                    <div className="buttons">
                        <button className='btn-cancel' type="button" onClick={handlePrevious}>Regresar</button>
                        <button className='btn-next' type="button">Enviar</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default RecoverForm;
