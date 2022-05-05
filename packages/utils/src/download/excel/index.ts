interface Params {
  filename: string;
  filetype?: string;
  userToken?: string;
  [propName: string]: string;
}

function urlEncode(params: Params): string {
  if (!params) return '';
  const entries = Object.entries(params);
  const arrayReduce = entries.reduce((result, entry) => {
    result.push(entry.join('='));
    return result;
  }, []);
  return `?${arrayReduce.join('&')}`;
}

export default function excel(url: string, params: Params): void {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url + urlEncode(params), true);
  xhr.responseType = 'blob';
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

  if (params.userToken && params.userToken.length) {
    xhr.setRequestHeader('user_token', params.userToken);
  }
  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      const filename = decodeURI(params.filename || 'file');
      const blob = new Blob([xhr.response], {
        type:
          (params.filetype === 'xls' && 'application/vnd.ms-excel') ||
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement('a');
        link.download = filename;
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      }
    }
  };
  xhr.send();
}
