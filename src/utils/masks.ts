export function CpfMask(value: string): string{
    
    value = value.replace(/[^0-9]/g, '');
  
    if (value.length <= 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
        .replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3'); 
    }
    
    return value;
}