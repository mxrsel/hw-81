import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { sendLink } from "../store/linksThunk.ts";

const LinkForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const link = useAppSelector((state) => state.links.link);
    const loading = useAppSelector((state) => state.links.isLoading);
    const [originalUrl, setOriginalUrl] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(sendLink(originalUrl));
    };

    return (
        <>
            {loading ? <p>Loading....</p> :
                <>
                    <h1>Shorten Your Link!</h1>
                    <form onSubmit={handleSubmit} className='d-flex justify-content-center align-items-center mb-3'>
                        <input
                            type="url"
                            name="originalUrl"
                            placeholder="Enter yuor URL"
                            value={originalUrl}
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            required
                            className='form-control'
                        />
                        <button type="submit" className='btn btn-dark'>
                            Shorten!
                        </button>
                    </form>

                    {link?.shortUrl && (
                        <p>
                            Your link now looks like this:
                            <a
                                href={`http://localhost:8000/links/${link.shortUrl}`}>
                                {`http://localhost:8000/links/${link.shortUrl}`}
                            </a>
                        </p>
                    )}
                </>
            }
        </>

    );
};

export default LinkForm;
