
return (
    <>
        <span>{stars.map((_, index) => (
            <span key={index} onClick={() => handleStartClick(index + 1)}
                style={{ cursor: 'pointer', color: index < rating ? 'gold' : 'gray' }}>
                <FontAwesomeIcon icon={faStar} />
            </span>
        ))}
        </span>
    </>
)