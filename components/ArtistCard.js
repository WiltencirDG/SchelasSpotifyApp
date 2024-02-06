import Image from 'next/image';
import React from 'react';

// Componente para exibir uma única música
const ArtistCard = ({ artist, onSelect  }) => (
    <div className="flex items-center text-white bg-black hover:bg-hover p-4 my-2 rounded-md" onClick={() => onSelect(artist)}>
        <Image width={64} height={64} src={artist.images[0]?.url} alt={artist.name} className="w-16 h-16 mr-4" />
        <div>
            <h3 className="text-xl font-bold">{artist.name}</h3>
        </div>
    </div>
);

export default ArtistCard;
