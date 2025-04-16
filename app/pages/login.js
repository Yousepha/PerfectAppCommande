import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const router = useRouter();

	const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {email, password})
            localStorage.setItem('token', response.data.token)
            router.push('/dashboard')
        } catch (error) {
            console.error('Login falled', error);
        }
    }

    return(
        <form onSubmit={ handleSubmit }>
            <input
                type="email"
                value={email}
                onChange={() => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={() => setPassword(e.target.value)}
                placeholder="Mot de passe"
                required
            />
            <button type="submit">Connexion</button>
        </form>
    )
}