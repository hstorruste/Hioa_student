#include "mainview.h"
#include "ui_mainview.h"
#include <QTcpServer>
#include <QMessageBox>


static int PORT_NUMBER = 23;
MainView::MainView(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainView),
    m_server{new QTcpServer(this)}
{
    ui->setupUi(this);
}

MainView::~MainView()
{
    delete ui;
}

void MainView::on_btnStartServer_clicked()
{
   if( StartServer()){
    ui->btnStartServer->setEnabled(false);
    ui->btnStartServer->setEnabled(true);
   }
}

void MainView::on_btnStopServer_clicked()
{
    StopServer();
    ui->btnStartServer->setEnabled(true);
    ui->btnStartServer->setEnabled(false);
}

bool MainView::StartServer(){

   bool result = m_server->listen(QHostAddress::Any, PORT_NUMBER);

    if(!result){
        QMessageBox::critical(this,tr("Echo server"),
                              tr("Unable to start server: %1")
                              .arg(m_server->errorString()));
        return false;
    }
    return true;
}

void MainView::StopServer(){

}
