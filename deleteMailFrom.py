import sys
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://mail.google.com/"]
BATCH_SIZE = 1000

def get_credentials():
    """Obtiene las credenciales del usuario."""
    creds = None
    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json",
                            SCOPES)
            creds = flow.run_local_server(port=0)
        with open("token.json", "w") as token:
            token.write(creds.to_json())
    return creds

def build_gmail_service():
    """Crea y retorna el servicio de Gmail."""
    creds = get_credentials()
    return build("gmail", "v1", credentials=creds)

def yield_messages(service, sender_email):
    """Genera mensajes que provienen del correo electrónico dado."""
    q = f"from:{sender_email}"
    results = service.users().messages().list(userId="me", q=q).execute()
    messages = results.get("messages", [])
    for msg in messages:
        yield msg
    while "nextPageToken" in results:
        page_token = results["nextPageToken"]
        results = service.users().messages().list(userId="me", q=q, pageToken=page_token).execute()
        if "messages" in results:
            for msg in results["messages"]:
                yield msg

def delete_messages(service, msg_ids):
    """Elimina en lotes todos los mensajes con los IDs dados."""
    service.users().messages().batchDelete(userId="me", body={"ids": msg_ids}).execute()

def main():
    if len(sys.argv) != 2:
        print("Usage: python script.py <sender_email>")
        return
    sender_email = sys.argv[1]
    service = build_gmail_service()
    msg_ids = []
    ndeleted = 0
    try:
        for msg in yield_messages(service, sender_email):
            msg_ids.append(msg["id"])
            if len(msg_ids) == BATCH_SIZE:
                delete_messages(service, msg_ids)
                ndeleted += BATCH_SIZE
                msg_ids = []
                print("Batch deleted.")
        if msg_ids:
            delete_messages(service, msg_ids)
            ndeleted += len(msg_ids)
        print(f"{ndeleted} messages deleted.")
    except HttpError as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
