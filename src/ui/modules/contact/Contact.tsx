import React, { useState, FormEvent } from 'react';
import styles from './contact.module.scss';

interface FormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    rgpd: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    phone?: string;
    service?: string;
    message?: string;
    rgpd?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        rgpd: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<FormStatus>('idle');
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Validation des champs
    const validateField = (name: keyof FormData, value: string | boolean): string | undefined => {
        switch (name) {
            case 'name':
                if (!value || (typeof value === 'string' && value.trim().length < 2)) {
                    return 'Le nom doit contenir au moins 2 caractères';
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value || (typeof value === 'string' && !emailRegex.test(value))) {
                    return 'Veuillez entrer une adresse email valide';
                }
                break;

            case 'phone':
                if (value && typeof value === 'string') {
                    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
                    if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                        return 'Numéro de téléphone invalide (format: 06 12 34 56 78)';
                    }
                }
                break;

            case 'service':
                if (!value) {
                    return 'Veuillez sélectionner un service';
                }
                break;

            case 'message':
                if (!value || (typeof value === 'string' && value.trim().length < 10)) {
                    return 'Le message doit contenir au moins 10 caractères';
                }
                break;

            case 'rgpd':
                if (!value) {
                    return 'Vous devez accepter la politique de confidentialité';
                }
                break;
        }
        return undefined;
    };

    // Validation complète du formulaire
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        Object.keys(formData).forEach((key) => {
            const error = validateField(key as keyof FormData, formData[key as keyof FormData]);
            if (error) {
                newErrors[key as keyof FormErrors] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Gestion du changement de champ
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Validation en temps réel si le champ a été touché
        if (touched[name]) {
            const error = validateField(name as keyof FormData, type === 'checkbox' ? checked! : value);
            setErrors((prev) => ({
                ...prev,
                [name]: error,
            }));
        }
    };

    // Gestion du blur (champ quitté)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setTouched((prev) => ({ ...prev, [name]: true }));

        const error = validateField(name as keyof FormData, type === 'checkbox' ? checked! : value);
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    // Soumission du formulaire
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Marquer tous les champs comme touchés
        setTouched({
            name: true,
            email: true,
            phone: true,
            service: true,
            message: true,
            rgpd: true,
        });

        if (!validateForm()) {
            return;
        }

        setStatus('submitting');

        try {
            // ⚠️ REMPLACE 'YOUR_FORM_ID' par ton vrai ID Formspree
            // Exemple: https://formspree.io/f/xpwzgknr
            const response = await fetch('https://formspree.io/f/xrbyvjrd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone || 'Non renseigné',
                    service: formData.service,
                    message: formData.message,
                    _subject: `Nouveau contact BuzzTech - ${formData.service}`,
                }),
            });

            if (response.ok) {
                setStatus('success');
                // Reset du formulaire
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    message: '',
                    rgpd: false,
                });
                setTouched({});
                setErrors({});

                // Retour à idle après 5 secondes
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error('Erreur serveur');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            setStatus('error');

            // Retour à idle après 5 secondes
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section className={styles.contact} aria-labelledby="contact-title">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 id="contact-title" className={styles.title}>
                        Contactez-nous
                    </h2>
                    <p className={styles.subtitle}>
                        Une question ? Un projet ? Nous sommes là pour vous accompagner.
                    </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    {/* Nom */}
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Nom complet <span className={styles.required} aria-label="requis">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`}
                            aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                            aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                            required
                        />
                        {errors.name && touched.name && (
                            <span id="name-error" className={styles.errorMessage} role="alert">
                                {errors.name}
                            </span>
                        )}
                    </div>

                    {/* Email */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email <span className={styles.required} aria-label="requis">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`}
                            aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                            aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                            required
                        />
                        {errors.email && touched.email && (
                            <span id="email-error" className={styles.errorMessage} role="alert">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    {/* Téléphone */}
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>
                            Téléphone <span className={styles.optional}>(optionnel)</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="06 12 34 56 78"
                            className={`${styles.input} ${errors.phone && touched.phone ? styles.inputError : ''}`}
                            aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                            aria-describedby={errors.phone && touched.phone ? 'phone-error' : undefined}
                        />
                        {errors.phone && touched.phone && (
                            <span id="phone-error" className={styles.errorMessage} role="alert">
                                {errors.phone}
                            </span>
                        )}
                    </div>

                    {/* Service */}
                    <div className={styles.formGroup}>
                        <label htmlFor="service" className={styles.label}>
                            Service concerné <span className={styles.required} aria-label="requis">*</span>
                        </label>
                        <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${styles.select} ${errors.service && touched.service ? styles.inputError : ''}`}
                            aria-invalid={errors.service && touched.service ? 'true' : 'false'}
                            aria-describedby={errors.service && touched.service ? 'service-error' : undefined}
                            required
                        >
                            <option value="">Sélectionnez un service</option>
                            <option value="Dépannage">Dépannage informatique</option>
                            <option value="Configuration">Configuration PC sur mesure</option>
                            <option value="Création Web">Création site web</option>
                            <option value="Autre">Autre demande</option>
                        </select>
                        {errors.service && touched.service && (
                            <span id="service-error" className={styles.errorMessage} role="alert">
                                {errors.service}
                            </span>
                        )}
                    </div>

                    {/* Message */}
                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.label}>
                            Votre message <span className={styles.required} aria-label="requis">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                            placeholder="Décrivez-nous votre besoin..."
                            className={`${styles.textarea} ${errors.message && touched.message ? styles.inputError : ''}`}
                            aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                            aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                            required
                        />
                        {errors.message && touched.message && (
                            <span id="message-error" className={styles.errorMessage} role="alert">
                                {errors.message}
                            </span>
                        )}
                    </div>

                    {/* RGPD */}
                    <div className={styles.formGroup}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="rgpd"
                                checked={formData.rgpd}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={styles.checkbox}
                                aria-invalid={errors.rgpd && touched.rgpd ? 'true' : 'false'}
                                aria-describedby={errors.rgpd && touched.rgpd ? 'rgpd-error' : undefined}
                                required
                            />
                            <span className={styles.checkboxText}>
                                J'accepte que mes données soient utilisées pour me recontacter.{' '}
                                <a href="/politique-confidentialite" className={styles.link} target="_blank">
                                    En savoir plus
                                </a>
                                <span className={styles.required} aria-label="requis"> *</span>
                            </span>
                        </label>
                        {errors.rgpd && touched.rgpd && (
                            <span id="rgpd-error" className={styles.errorMessage} role="alert">
                                {errors.rgpd}
                            </span>
                        )}
                    </div>

                    {/* Bouton submit */}
                    <button
                        type="submit"
                        className={styles.submitButton}
                        disabled={status === 'submitting'}
                        aria-busy={status === 'submitting'}
                    >
                        {status === 'submitting' ? 'Envoi en cours...' : 'Envoyer le message'}
                    </button>

                    {/* Messages de feedback */}
                    {status === 'success' && (
                        <div className={styles.successMessage} role="alert" aria-live="polite">
                            ✅ Message envoyé avec succès ! Nous vous recontacterons rapidement.
                        </div>
                    )}

                    {status === 'error' && (
                        <div className={styles.errorMessageGlobal} role="alert" aria-live="assertive">
                            ❌ Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Contact;