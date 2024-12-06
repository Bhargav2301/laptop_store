export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
};

export const formatStorage = (ssd: number, hdd: number): string => {
    const parts = [];
    if (ssd > 0) parts.push(`${ssd}GB SSD`);
    if (hdd > 0) parts.push(`${hdd}GB HDD`);
    return parts.join(' + ') || 'N/A';
};

export const formatRAM = (gb: number, type?: string): string => {
    return `${gb}GB${type ? ` ${type}` : ''}`;
}; 