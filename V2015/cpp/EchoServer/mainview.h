#ifndef MAINVIEW_H
#define MAINVIEW_H

#include <QMainWindow>

namespace Ui {
class MainView;
}

class QTcpServer;

class MainView : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainView(QWidget *parent = 0);
    ~MainView();

private slots:
    void on_btnStartServer_clicked();

    void on_btnStopServer_clicked();

private:
    Ui::MainView *ui;
    QTcpServer* m_server;
    bool StartServer();
    void StopServer();
};

#endif // MAINVIEW_H
